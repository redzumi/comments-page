import io                     from 'socket.io-client';
import {
  ADD_COMMENT_REQUEST,
  REMOVE_COMMENT_REQUEST }    from '../../../common/constants/Comments';
import {
  GET_CLIENT_TOKEN,
  SET_CLIENT_TOKEN }          from '../../../common/constants/Socket';

let socket        = null;

let getToken = () => {
  let token = localStorage.getItem('token');
  if(!token) {
    token = socket.id;
    localStorage.setItem('token', token);
  }
  return token;
};

export const socketIOMiddleware = ({ dispatch, getState }) => next => action => {
  if(typeof action === 'function') return action(dispatch, getState); //thunk

  switch (action.type) {
    case ADD_COMMENT_REQUEST: {
      console.log('new action to socket: ' + JSON.stringify(action));
      socket.emit('action', action);
      break;
    }

    case REMOVE_COMMENT_REQUEST: {
      console.log('new action to socket: ' + JSON.stringify(action));
      socket.emit('action', action);
      break;
    }
  }

  return next(action);
};

export const connectSocket = ({ dispatch }, host) => {
  socket = io.connect(host);

  socket.on('action', action => {
    console.log('new action from socket: ' + JSON.stringify(action));

    switch (action.type) {
      case GET_CLIENT_TOKEN: {
        let tokenResponse = {
          type: SET_CLIENT_TOKEN,
          payload: getToken()
        };
        socket.emit('action', tokenResponse);
        console.log('new action to socket: ' + JSON.stringify(tokenResponse));
        break;
      }

      default: {
        dispatch(action);
      }
    }
  });
};
