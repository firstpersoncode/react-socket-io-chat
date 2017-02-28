/*
 *
 * App
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// actions
import { addChat, historyChat, authentication, session } from './actions';
// import { historyChat, authentication, session } from './actions';

// components
import ChatBox from './ChatBox';
import ChatContainer from './ChatContainer';
import ChatText from './ChatText';
import Login from './Login';

// socket
// import io from './socket';
const socket = io.connect(window.location.hostname);

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      status: "",
      users: false,
    };
    this.newChat = this.newChat.bind(this);
    this.login = this.login.bind(this);
    this.loadHistory = this.loadHistory.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(addChat());
    this.props.dispatch(historyChat());
  }


  // login handler
  login(e) {
    const auth = document.getElementById('authbox');
    e.preventDefault();

    // trigger authentication on socket and send data to server
    this.setState({ status: "server error" })

    socket.emit('authentication', auth.value, (data) => {
      const that = this;
      if (data) { // validate response from server
        this.props.dispatch(authentication(() => {
          that.props.dispatch(session(data));
          // auto scroll to bottom after login
          // setTimeout(function() {
          //   var elem = document.getElementById('chat-container');
          //   elem.scrollTop = elem.scrollHeight;
          // }, 50);
        }));
      } else {
        this.setState({
          status: "Username is taken"
        });
      }
    });
    setTimeout(() => {
      this.setState({
        status: ""
      });
    }, 1000)
    auth.value = '';
  }

  // new chat handler
  newChat(e) {
    // auto scroll to bottom for new chat
    setTimeout(function() {
      var elem = document.getElementById('chat-container');
      elem.scrollTop = elem.scrollHeight;
    }, 50);
    const text = document.getElementById('chatbox');
    e.preventDefault();
    // trigger send chat on socket and send data to server
    socket.emit('send chat', text.value);
    text.value = '';
  }

  loadHistory() {
    this.props.dispatch(historyChat());
  }

  showUsers() {
    this.setState({
      users: !this.state.users,
    });
  }

  render() {

    // login status conditional
    const { login } = this.props.appState;
    if (login) {
      const { chat, user } = this.props.appState.chat && this.props.appState.user ? this.props.appState : null;
      // map chat list
      const mapChat = chat.map((index, keys) => {
        // check line break
        if (index === '<hr />') {
          return <hr key={keys} />
        } else {
          return <ChatText key={keys} name={index.name} txt={index.txt} stamp={index.stamp} />
        }
      });
      // map user list
      const mapUser = user.map((index, keys) => (
        <li key={keys}>{index}</li>
      ));
      // logged in
      return (
        <div class={this.state.users ? "show-user" : ""}>
          <button id="showUsers" onClick={this.showUsers.bind(this)}>Users online</button>
          <div class="chat-parent">
            <ChatContainer mapChat={mapChat} loadHistory={this.loadHistory.bind(this)} />
            <ul id="users">{mapUser}</ul>
          </div>
          <ChatBox newChat={this.newChat} />
        </div>
      );
    } else {
      // logged out
      return (
        <div>
          <p>{this.state.status}</p>
          <Login login={this.login} />
        </div>
      );
    } // end login status conditional
  }// end render
}

export default connect((store) => {
  return {
    appState: store.appState,
  }
})(App);
