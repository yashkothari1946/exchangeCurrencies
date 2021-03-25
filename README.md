## APP CONFIG PATH FOR PEMN.JS FRAMEWORK

```sh
$ nano /config/appConfig.js
```

## APP CONFIG STRUCTURE
```js

module.exports = {
    'PORT': 8000,
    'ACCESS_KEY': '', //access key from fixer.io
    'REDIS_HOST': '', //if none will take from localhost
    'REDIS_PORT': '', //if none will take default 6379
    'CURRENCY': ''    //Accepting currency as Excluding USD - 'SGD,HKD'
}

```

## API ENDPOINT STRUCTURE
```js

Route - `http://localhost:8000/api/exchange`,
Method - POST,
BODY - {
    "exchange": {
        "from":"USD", //from conversion
        "to":"HKD", // to conversion
        "amount":10  // amount to be converted
    }
}

```