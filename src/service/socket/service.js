import socket           from 'socket.io';
import uuid             from 'uuid/v1';
import {
  ADD_COMMENT_RESULT,
  NEW_COMMENT,
  COMMENTS }              from '../../common/constants/Comments';

const PORT          = 3001;
const io            = socket.listen(PORT);

const db = [];

for(let i = 0; i <= 14; i++) {
  db.push({ id: uuid(), name: 'Title ' + i, body: 'Body ' + i });
}

io.sockets.on('connection', (socket) => {

  console.log(socket.id);

  //at first - sending comments from db
  console.log('sending comments from db: ' + db.length);
  io.emit('action', { type: COMMENTS, payload: db });

  socket.on('add_comment', (data) => {
    data.id = uuid();
    db.push(data);
    console.log('added comment: ' + JSON.stringify(data));
    setTimeout(() => {
      socket.emit('action', { type: ADD_COMMENT_RESULT, payload: {
        success: true
      }});
      io.emit('action', { type: NEW_COMMENT, payload: data }); //sent new comment to all clients
    }, 1000);
  });

});
