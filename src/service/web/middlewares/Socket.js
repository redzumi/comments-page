import io                     from 'socket.io-client';
import {
  ADD_COMMENT_REQUEST }       from '../../../common/constants/Comments';

let socket        = null;

export const socketIOMiddleware = ({ dispatch, getState }) => next => action => {
  if(typeof action === 'function') return action(dispatch, getState); //thunk

  switch (action.type) {
    case ADD_COMMENT_REQUEST: {
      console.log('socket add comment: ' + action.payload);
      socket.emit('add_comment', action.payload);
    }
  }

  return next(action);
};

export const connectSocket = ({ dispatch }, host) => {
  socket = io.connect(host);

  socket.on('action', data => {
    console.log('new action from socket: ' + JSON.stringify(data));
    dispatch(data);
  });
};
