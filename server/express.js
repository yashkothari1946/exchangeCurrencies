var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    port = process.env.PORT;


// SETUP ALL ROUTES
var setupExpressRoutes = function () {
    return new Promise((resolve, reject) => {
        var routes = require(path.resolve('./server/routes/routes')).routes
        var getMethodRoutes = [],
            postMethodRoutes = [];

        routes.map((route) => {
            if (route.method.toLowerCase() === 'get') {
                getMethodRoutes.push(route);
            } else if (route.method.toLowerCase() === 'post') {
                postMethodRoutes.push(route);
            }
        });

        postMethodRoutes.map((route) => {
            app.post(route.url, route.middleware, route.controller);
        });

        getMethodRoutes.map((route) => {
            app.get(route.url, route.middleware, route.controller);
        });

        return resolve();
    });
}

// SETUP REDIS
var setupRedis = function () {
    return new Promise((resolve, reject) => {
        var redis = require(path.resolve('./server/redis')).redis;
        return resolve();
    });
}

// INITIATE EXPRESS SERVER AFTER COMPLETE THE ENV SETUP 
exports.initiateServer = function () {
    return new Promise((resolve, reject) => {
        setupRedis().then((redisResult) => {
            // parse application/x-www-form-urlencoded
            app.use(bodyParser.urlencoded({
                extended: false
            }));

            // parse application/json
            app.use(bodyParser.json());

            setupExpressRoutes().then(() => {
                app.listen(port, () => console.log(`Batch server listening on port ${port}!`))
            });
        }).catch(err => console.log(err));
    });
}