/*
 *
 * ChatHome actions
 *
 */
 import {
   ADD_CHAT,
   FETCH_CHAT,
   AUTHENTICATION,
   SESSION,
 } from './constants';

 // import io from './socket';
const socket = io.connect('http://simple-realtime-chat-react.herokuapp.com/');


// fetch chat actions
 function addChatResult(payload) {
   return {
     type: ADD_CHAT,
     payload,
   };
 }
 export function addChat() {
   return (dispatch) => {
     socket.on('new chat', (data) => {
       dispatch(addChatResult(data));
     });
   };
 }


 // fetch chat from database
 function historyChatResult(payload) {
   return {
     type: FETCH_CHAT,
     payload,
   };
 }

 export function historyChat() {
   return (dispatch) => {
     socket.emit('fetch history', (data) => {
       // add line break
       if (data.length > 1) data.docs.push('<hr />');
       dispatch(historyChatResult(data.docs.concat().reverse()));
     });
   };
 }


// authentication action
 function authenticationResult(payload) {
   return {
     type: AUTHENTICATION,
     payload,
   };
 }
 export function authentication(cb) {
   return (dispatch) => {
     socket.on('authentication complete', (data) => {
       dispatch(authenticationResult(data));
       cb();
     });
   };
 }
 export function session(payload) {
   return {
     type: SESSION,
     payload,
   };
 }
