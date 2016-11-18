const process = require('process'),
config = require('./config.js'),
socketioEmiiter = require('socket.io-emitter');

var io = socketioEmiiter({host: config.redis_host, port: config.redis_port});

io.to(process.argv[2]).emit('event', process.argv[3]);
setTimeout(() => {process.exit(0)}, 1000);
