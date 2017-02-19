/*
 *
 * ChatHome reducer
 *
 */
import Immutable from 'immutee';
import {
  ADD_CHAT,
  FETCH_CHAT,
  AUTHENTICATION,
  SESSION,
} from './constants';
const initialState = {
  chat: [],
  user: [],
  login: false,
};


export default function(state = initialState, action) {
  // console.log(state.merge('user', "nasser").done());
  const immutable = Immutable(state);
  switch (action.type) {
    case ADD_CHAT: {
      return immutable.merge('chat', action.payload).done();
      break;
    }
    case FETCH_CHAT: {
      return immutable.set('chat', (chat) => {
        return action.payload.concat(chat)
      }).done();
      break;
    }
    case AUTHENTICATION: {
      return immutable.set('user', action.payload).done();
      break;
    }
    case SESSION: {
      return immutable.set('login', action.payload).done();
      break;
    }
    default:
      return state;
  }
}
