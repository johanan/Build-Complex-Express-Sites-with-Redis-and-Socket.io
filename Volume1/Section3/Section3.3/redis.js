const config = require('./config.js'),
redis = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

var hgetall = (key) => {
  return new Promise((resolve, reject) => {
    if(key === null) reject();
    client.hgetall(key, (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

var lrange = (key) => {
  return new Promise((resolve, reject) => {
    client.lrange(key, [0, -1], (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
};

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.lrange = lrange;
module.exports.client = client;
