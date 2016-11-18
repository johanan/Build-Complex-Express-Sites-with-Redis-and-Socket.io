const express = require('express'),
  session = require('express-session'),
  socketio = require('socket.io');

var app = express();
var server = app.listen(8080);
var io = socketio(server);

var sessionMiddleware = session({
  secret: 'make this a good secret',
  resave: false,
  saveUninitialized: true
});

//setup express to use middleware
app.use(sessionMiddleware);
app.use((req, res, next) => {
  console.log(`From Express: ${req.session.name}`);
  next();
});
app.use(express.static('static'));

//socket.io middleware
io.use((socket, next) => {sessionMiddleware(socket.request, {}, next);});

io.on('connection', (socket) => {
  console.log(socket.request.session);
  if(socket.request.session.name !== undefined){
    socket.emit('name', socket.request.session.name);
    io.emit('event', socket.request.session.name + ' has joined!');
  }


  socket.on('name', (name) => {
    socket.request.session.name = name;
    socket.request.session.save();
    socket.broadcast.emit('event', name + ' says hello!');
  });
});
