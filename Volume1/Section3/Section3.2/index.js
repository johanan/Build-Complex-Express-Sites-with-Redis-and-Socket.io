const express = require('express'),
  config = require('./config.js'),
  process = require('process'),
  redis = require('redis');

var app = express();
//connect to redis
var redisClient = redis.createClient(config.redis_port, config.redis_host);
var publishClient = redis.createClient(config.redis_port, config.redis_host);
redisClient.on("message", (channel, message) => {
  console.log(message);
});

redisClient.subscribe('REQUESTS');

app.get('/', (req, res) => {
  publishClient.publish('REQUESTS', `Request on ${req.socket.localPort} for ${req.url}`);
  console.log(`Local log for ${req.url}`);
  res.end();
});

app.listen(process.argv[2]);
