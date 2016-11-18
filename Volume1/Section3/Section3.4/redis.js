const config = require('./config.js'),
redis = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var promiser = (resolve, reject) => {
  return (err, data) => {
    if(err) reject(err);
    resolve(data);
  };
};

var get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, promiser(resolve, reject));
  });
};

var hgetall = (key) => {
  return new Promise((resolve, reject) => {
    if(key === null) reject();
    client.hgetall(key, promiser(resolve, reject));
  });
};

var zrevrangebyscore = (key, max, min) => {
  return new Promise((resolve, reject) => {
    client.zrevrangebyscore(key, max, min, promiser(resolve, reject));
  });
};

module.exports.get = get;
module.exports.hgetall = hgetall;
module.exports.zrevrangebyscore = zrevrangebyscore;
module.exports.client = client;
