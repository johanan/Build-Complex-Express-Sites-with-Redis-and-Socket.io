const express = require('express'),
  socketio = require('socket.io'),
  redis = require('./redis.js');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

app.use(express.static('static'));

var errorEmit = (socket) => {
  return (err) => {
    console.log(err);
    socket.broadcast.emit('user.events', 'Something went wrong!');
  };
};

io.on('connection', (socket) => {
  socket.broadcast.emit('user.events', 'Someone has joined!');
  socket.on('name', (name) => {
    redis.storeUser(socket.id, name)
    .then(() => {
      console.log(name + ' says hello!');
      socket.broadcast.emit('name', name);
    }, errorEmit(socket));
  });

  socket.on('disconnect', () => {
    redis.getUser(socket.id)
    .then((user) => {
      if (user === null) return 'Someone'
      else return user
    })
    .then((user) => {
      console.log(user + ' left');
      socket.broadcast.emit('user.events', user + ' left');
    }, errorEmit(socket))
  });
});
