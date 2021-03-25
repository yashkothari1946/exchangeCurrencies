var redis = require('redis'),
    redisHost = process.env.REDIS_HOST || 'localhost',
    redisPort = process.env.REDIS_PORT || 6379;

console.log('Connecting to Redis...');
var redis = redis.createClient(redisPort, redisHost);

redis.on('ready', function() {
    console.log('Connected to Redis.');
});

redis.on("error", function (err) {
    console.log("Could not connect to Redis..." + err);
});

exports.redis = redis;