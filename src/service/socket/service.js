import socket           from 'socket.io';
import { List, Map }    from 'immutable';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESULT,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT,
  NEW_COMMENT,
  SET_COMMENTS }        from '../../common/constants/Comments';
import {
  GET_CLIENT_TOKEN,
  SET_CLIENT_TOKEN }    from '../../common/constants/Socket';

const PORT          = 3001;
const io            = socket.listen(PORT);

let db = List([]);

let addComment = (client, comment) => {
  comment.id = db.size;
  comment.token = client.token;

  comment = Map(comment);
  db = db.push(comment);

  return db.get(db.indexOf(comment));
};

let removeComment = (client, comment) => {
  db = db.filter((dbComment) => {
    return (
      dbComment.toJS().id !== comment.id &&
      dbComment.toJS().token !== comment.token
    );
  });
  return comment;
};

let convertCommentToClient = (client, comment) => {
  if(client && client.token == comment.token)
    comment.canRemove = true;
  else
    delete comment.token;
  return comment;
};

io.sockets.on('connection', (socket) => {

  //at first lets get client token
  socket.emit('action', { type: GET_CLIENT_TOKEN });

  socket.on('action', (action) => {
    switch (action.type) {
      case SET_CLIENT_TOKEN: {

        socket.token = action.payload;

        socket.emit('action', {
          type: SET_COMMENTS,
          payload: db.map((comment) => {
            return convertCommentToClient(socket, comment.toJS());
          })
        });

        break;
      }

      case ADD_COMMENT_REQUEST: {

        let comment = addComment(socket, action.payload);
        let error = false;

        setTimeout(() => {
          if(error) {
            socket.emit('action', {
              type: ADD_COMMENT_RESULT,
              payload: { success: false, error: 'Ошибка, тащемта.' }
            });
          } else {
            //result of adding
            socket.emit('action', {
              type: ADD_COMMENT_RESULT,
              payload: { success: true }
            });

            //only for me
            socket.emit('action', {
              type: NEW_COMMENT,
              payload: convertCommentToClient(socket, comment.toJS())
            });

            //to all
            socket.broadcast.emit('action', {
              type: NEW_COMMENT,
              payload: convertCommentToClient(null, comment.toJS())
            });
          }
        }, 1000);

        break;
      }

      case REMOVE_COMMENT_REQUEST: {
        let comment = removeComment(socket, action.payload);

        setTimeout(() => {
          io.emit('action', {
            type: REMOVE_COMMENT,
            payload: convertCommentToClient(socket, comment)
          });
        }, 1000);

        break;
      }
    }
  });

});
