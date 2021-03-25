'use strict';

const chalk = require('chalk');

/**
 * Get unique error field name
 */
var getUniqueErrorMessage = function(err) {
  var output;

  try {
    var fieldName = err.errmsg.substring(err.errmsg.lastIndexOf('.$') + 2, err.errmsg.lastIndexOf('_1'));
    output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

  } catch (ex) {
    output = 'Unique field already exists';
  }

  return output;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
        if(err.errors[errName].path){
          message = message + ' on path ' + err.errors[errName].path;
        }
      }
    }
  }

  return message;
};

/**
 * Set the error message for custom message
 */
exports.setErrorMessage = function(message) {
  var err = {};
  err.message = message;
  return err;
};

/***
  * error console custom function
  */
exports.console = function(whichController, whichFunction, msg, type){
  if(type == 'error'){
    console.log(chalk.red("*********Error Block Starts here*********"));
    console.error(chalk.red(whichController),chalk.red(" error from "),chalk.red(whichFunction)," - ",chalk.red(msg), new Date());
    console.log(chalk.red("*********Error Block Ends here*********"));
    return;
  } else if(type == 'warning'){
    return console.warn(chalk.yellow("Warning : "),chalk.yellow(whichController),chalk.yellow(" warn from "),chalk.yellow(whichFunction)," - ",chalk.yellow(msg), new Date());
  }
  else{
    return console.log(chalk.green(whichController),chalk.green(" console from "),chalk.green(whichFunction)+" - "+chalk.green(msg), new Date());
  }
}