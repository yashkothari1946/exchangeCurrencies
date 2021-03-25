var path = require('path'),
	ErrorHandler = require(path.resolve('./server/controllers/errors.server.controller')),
	redis = require(path.resolve('./server/redis')).redis;

exports.getRedisData = function (key) {
	return new Promise((resolve, reject) => {
		redis.get(key, function (err, reply) {
			if (reply) {
				return resolve(JSON.parse(reply));
			} else {
				ErrorHandler.console('redisController','getRedisData',`err in ${key} is ${err}`,'error');
				return reject(key + ' not configured ' + err);
			}
		});
	});
}

exports.setRedisData = function (key, value) {
	return new Promise((resolve, reject) => {
		redis.del(key, function (err, reply) {
			if (err) {
				ErrorHandler.console('redisController','setRedisData',`err in ${key} is ${err}`,'error');
				reject(key + ' not able to configure ' + err);
			}
			ErrorHandler.console('redisController','setRedisData',`Deleted ${key}`,'');
			redis.set(key, JSON.stringify(value), function (err, reply) {
				if (err) {
					ErrorHandler.console('redisController','setRedisData',`err in ${key} is ${err}`,'error');
					reject(key + ' not able to configure ' + err);
				}
				resolve("done");
			});
		});
	});
}

exports.clearRedisData = function (key) {
	return new Promise((resolve, reject) => {
		redis.del(key, function (err, reply) {
			if (err) {
				ErrorHandler.console('redisController','clearRedisData',`err in ${key} is ${err}`,'error');
				reject(key + ' not able to configure ' + err);
			}
			ErrorHandler.console('redisController','clearRedisData',`Deleted ${key}`,'');
			resolve("done");
		});
	});
}

exports.setExpiryRedisData = function (key, value, hours) {
	let expiryTime = (60 * 60 * (hours * 1));
	return new Promise((resolve, reject) => {
		redis.del(key, function (err, reply) {
			if (err) {
				ErrorHandler.console('redisController','setExpiryRedisData',`err in ${key} is ${err}`,'error');
				reject(key + ' not able to configure ' + err);
			}
			ErrorHandler.console('redisController','setExpiryRedisData',`Deleted ${key}`,'');
			redis.set(key, JSON.stringify(value), 'EX', expiryTime, function (err, reply) {
				if (err) {
					ErrorHandler.console('redisController','setExpiryRedisData',`err in ${key} is ${err}`,'error');
					reject(key + ' not able to configure ' + err);
				}
				resolve("done");
			});
		});
	});
}
