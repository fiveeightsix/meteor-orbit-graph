var util = require('util');


function ParseError(message) {
  this.message = message;
  this.name = 'ParseError';
}

util.inherits(ParseError, Error);

module.exports = ParseError;
