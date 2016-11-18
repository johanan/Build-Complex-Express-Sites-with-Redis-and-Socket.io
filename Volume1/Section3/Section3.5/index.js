const express = require('express'),
  process = require('process'),
  redis = require('./redis.js');

var app = express();
//setup redis data
redis.client.flushall();
redis.client.geoadd('places', 86.2520, 41.6764, "South Bend");
redis.client.geoadd('places', 85.9767, 41.6820, "Elkhart");
redis.client.geoadd('places', 87.6298, 41.8781, "Chicago");

app.get('/aroundsb/:miles', (req, res) => {
  redis.aroundSB(parseInt(req.params.miles))
  .then((data) => res.send(data));
});

app.get('/around/:long/:lat/:miles', (req, res) => {
  redis.aroundLoc(req.params.long, req.params.lat, parseInt(req.params.miles))
  .then((data) => res.send(data));
});

app.listen(process.argv[2]);
