const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('socketping', () => {
    console.log('Received socketping, sending socketpong');
    socket.emit('socketpong');
  });
});
