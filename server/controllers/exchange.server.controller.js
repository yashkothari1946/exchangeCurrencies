var path = require('path'),
	ErrorHandler = require(path.resolve('./server/controllers/errors.server.controller')),
	Redis = require(path.resolve('./server/controllers/redis.server.controller')),
    axios = require('axios')

exports.exchange = function(req,res) {

	let data = {
		from : req.body.exchange.from,
		to : req.body.exchange.to,
		amount : req.body.exchange.amount
	}

    getExchange(data).then((amount)=>{
		return res.send({convertedAmount : amount}); 	    	
    },(err)=>{
    	return res.status(400).send(ErrorHandler.setErrorMessage(err, 400));
    });
    
}

var getExchange = function(data){
	return new Promise((resolve, reject) => {
		Redis.getRedisData('exchangeValues').then((result) => {
			return resolve(getExchangeAmount(data,result));
		},(err)=>{
			axios({
                url: `http://data.fixer.io/api/latest?access_key=${process.env.ACCESS_KEY}&&symbols=USD,${process.env.CURRENCY}&format=1`,
                method: 'GET'
            }).then((response) => {
				if(response && response.data && response.data.base == "EUR"){
					Redis.setExpiryRedisData('exchangeValues',response.data.rates,1);
					return resolve(getExchangeAmount(data,response.data.rates));
				} else {
					reject('We are floating in the air, We will fix it fast. Get back in few hours');
				}
	        }).catch(err => {
	        	ErrorHandler.console('exchangeController','getExchange',`err is ${err}`,'error');
				reject('Something Went wrong');
			});
		}).catch(err => {
			ErrorHandler.console('exchangeController','getExchange',`err is ${err}`,'error');
			reject('Something Went wrong');
		});
	});
}

var getExchangeAmount = function(data,rates){
	return data.amount * (rates[data.to] / rates[data.from]);
	// USD/EUR * EUR/HKD - USD/HKD 
}
