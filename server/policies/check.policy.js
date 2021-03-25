var	path = require('path'),
	ErrorHandler = require(path.resolve('./server/controllers/errors.server.controller'));

exports.checkBody = function(req,res,next) {
	if(!req.body || !req.body.exchange || !req.body.exchange.from || !req.body.exchange.to || !req.body.exchange.amount){
		return res.status(400).send(ErrorHandler.setErrorMessage('Bad Request', 400));
	}

	if(req.body.exchange.from == req.body.exchange.to && req.body.exchange.from.inludes(process.env.CURRENCY) && req.body.exchange.to.inludes(process.env.CURRENCY)) {
		return res.status(400).send(ErrorHandler.setErrorMessage('Invalid Request to curate', 400));	
	}

	if(req.body.exchange.from != 'USD' && req.body.exchange.to != 'USD'){
		return res.status(400).send(ErrorHandler.setErrorMessage('One of the exchange units expects USD', 400));	
	}

	return next();
}