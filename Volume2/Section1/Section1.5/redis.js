const config = require('./config.js'),
redis = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var promiser = (resolve, reject) => {
  return (err, data) => {
    if(err) reject(err);
    resolve(data);
  };
};

var storeUser = (socketID, user) => {
  return new Promise((resolve, reject) => {
    client.setex(socketID, config.expire, user, promiser(resolve, reject));
  });
};

var getUser = (socketID) => {
  return new Promise((resolve, reject) => {
    client.get(socketID, promiser(resolve, reject));
    //test errors here
    //client.get(socketID, 12345, promiser(resolve, reject));
  });
};

module.exports.storeUser = storeUser;
module.exports.getUser = getUser;
