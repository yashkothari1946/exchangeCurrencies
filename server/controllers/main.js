var path = require('path'),
    _ = require('lodash');

module.exports = _.extend(
    require(path.resolve('./server/controllers/exchange.server.controller'))
);