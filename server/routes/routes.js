var path = require('path'),
	CheckPolicy = require(path.resolve('./server/policies/check.policy'));
    Controller = require(path.resolve('./server/controllers/main'));

exports.routes = [{
        'url': '/api/exchange',
        'method': 'post',
        'middleware': [CheckPolicy.checkBody],
        'controller': Controller.exchange
    }
]