const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');
const mongoose = require('mongoose');

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.render('/dist/index.html');
});
server.listen(process.env.PORT || 5009);

// connect database
mongoose.connect('mongodb://localhost/nj', (err) => {
  if(err) {
    console.log(err)
  }else {
    console.log('Connected to database')
  }
});

var chatSchema = mongoose.Schema({
  txt: String,
  name: String,
  stamp: {type: Date, default: Date.now},
});
var Chat = mongoose.model('Message', chatSchema);
// initial state
// var user = [];
var login = {};


io.sockets.on('connection', (socket) => {
  // load chat history from database
  let page = 0;
  const limit = 10;
  socket.on('fetch history', (res) => {
    var historyChat = Chat.find({});

    historyChat.sort('-stamp').skip(page * limit).limit(limit).exec((err, docs) => {
      if(err) throw err;
      setTimeout(() => {
        res({docs, length: docs.length});
      }, 2000);
    });
    page = (page + 1);
  });


  // authentication
  socket.on('authentication', (data, cb) => {
    // if(user.indexOf(data) != -1) {
    //   if (data in login) {
    //     cb(false);
    //   } else {
    //     socket.user = data;
    //     login[socket.user] = socket;
    //     cb(true);
    //     updateLogin();
    //   }
    // } else {
    //   cb(false);
    // }
    if (data in login) {
      cb(false);
    } else {
      socket.user = data;
      login[socket.user] = socket;
      cb(true);
      updateLogin();
    }

  });

  // new chat
  socket.on('send chat', (data) => {
    // insert new chat into database
    var newMsg = new Chat({
      txt: data,
      name: socket.user,
    });
    newMsg.save()
    .then((newMsg) => {
      // console.log(newMsg);
      io.sockets.emit('new chat', {txt: data, name: socket.user});
    })
    .catch((err) => {
      throw err;
    });
  });

  // disconnect
  socket.on('disconnect', (data) => {
    if (!socket.user) return;
    delete login[socket.user];
    updateLogin();
  })

  // handle login state
  function updateLogin() {
    io.sockets.emit('authentication complete', Object.keys(login));
  }

});
