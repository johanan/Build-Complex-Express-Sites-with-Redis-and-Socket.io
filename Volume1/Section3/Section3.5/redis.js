const config = require('./config.js'),
redis = require('redis');

var client = redis.createClient(config.redis_port, config.redis_host);

var promiser = (resolve, reject) => {
  return (err, data) => {
    if(err) reject(err);
    resolve(data);
  };
};

var aroundLoc = (long, lat, miles) => {
  return new Promise((resolve, reject) => {
    client.georadius('places', long, lat, miles, 'mi', 'WITHDIST', promiser(resolve, reject));
  });
};

var aroundSB = (miles) => {
  return new Promise((resolve, reject) => {
    client.georadiusbymember('places', "South Bend", miles, 'mi', 'WITHDIST', promiser(resolve, reject));
  });
};

module.exports.aroundLoc = aroundLoc;
module.exports.aroundSB = aroundSB;
module.exports.client = client;
