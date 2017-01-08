var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('subscribe', function(room) {
      console.log('joining room', room);
      socket.join(room);
  });

  socket.on('send message', function(data) {
      console.log('sending room post', data.room);
      socket.broadcast.to(data.room).emit('conversation private post', {
          message: data.message
      });
  });
});

http.listen(4241, '127.0.0.1', function(){
  console.log('listening on 127.0.0.1:4241');
});
