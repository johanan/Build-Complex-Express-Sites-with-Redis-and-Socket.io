const express = require('express'),
  socketio = require('socket.io'),
  router = require('./routes.js');

var app = express();
var server = app.listen(8080);
var io = socketio(server);


//setup express to use middleware
app.use('/', router);

io.on('connection', (socket) => {
  //we need specific events for each
  //cubs and bears
});
