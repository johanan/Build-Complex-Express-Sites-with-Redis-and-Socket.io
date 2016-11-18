const express = require('express'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

app.use(express.static('static'));

io.on('connection', (socket) => {
  socket.on('name', (name) => {
    console.log(name + ' says hello!');
    io.emit('name', name);
  });
});
