const express = require('express'),
  process = require('process'),
  redis = require('./redis.js');

var app = express();
//setup redis data
redis.client.flushall();
redis.client.hmset('dog:1', ['name', 'gizmo', 'age', '5']);
redis.client.hmset('dog:2', ['name', 'dexter', 'age', '6']);
redis.client.hmset('dog:3', ['name', 'fido', 'age', '5']);
//we are using name like username, unique
redis.client.set('dog:name:gizmo', 'dog:1');
redis.client.set('dog:name:dexter', 'dog:2');
redis.client.set('dog:name:fido', 'dog:3');
//ages are not unique
redis.client.lpush('dog:age:5', ['dog:1', 'dog:3']);
redis.client.lpush('dog:age:6', 'dog:2');

app.use((req, res, next) => {
  console.time('request');
  next();
});

app.get('/dog/name/:name', (req, res) => {
  //first find the id
  redis.get('dog:name:' + req.params.name)
  .then(redis.hgetall)
  .then((data) => res.send(data));
  console.timeEnd('request');
});

app.get('/dog/age/:age', (req, res) => {
  redis.lrange('dog:age:' + req.params.age)
  .then((data) => Promise.all(data.map(redis.hgetall)))
  .then((data) => res.send(data));
  console.timeEnd('request');
});

app.listen(process.argv[2]);
