var ParseError = require('./ParseError.js');


function isDataLine(line) {
  return line.match(/^[0-9]/);
}


function isMetaLine(line) {
  return line.match(/^\[[a-zA-Z0-9 -_]+\]/);
}


function isHeaderLine(line) {
  return line.match(/^[jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec]/);
}


function parseDataLine(line) {
  var day, value;
  var elements = line.split('|', 25) // maximum 24 hours + day
    .map(function (element) { return element.trim(); })
    .map(function (element) {
      if (element == '???') {
        return null;
      }
      else {
        value = parseInt(element, 10);
        if (!isNaN(value)) {
          return parseInt(value);
        }
        else {
          throw new ParseError('invalid hourly count value: ' + element);
        }
      }
    });
  elements.shift();
  return elements;
}


function parseMetaLine(line) {
  var parts = line.split(']', 2);
  return {
    key: parts[0].replace('[', '').trim(),
    value: parts[1].trim()
  };
}


function parseHeaderLine(line) {
  return line.split('|', 1)[0];
}


function asLines(text) {
  return text.match(/[^\r\n]+/g).map(Function.prototype.call, String.prototype.trim);
}


exports.parse = function(text) {
  var data = [];
  var meta = [];
  var month;
  var lines = asLines(text);
  var headerLine;

  headerLine = lines.filter(isHeaderLine)[0];
  if (headerLine) {
    month = parseHeaderLine(headerLine);
  }
  else {
    throw new ParseError('file does not have a valid header line.');
  }
  
  data = lines.filter(isDataLine).map(parseDataLine);
  meta = lines.filter(isMetaLine).map(parseMetaLine);


  return {month: month, data: data, meta: meta};
};


exports.makeDataURL = function(observerID, year, month) {
  return 'http://www.rmob.org/visual/' + year + '/' + observerID + '_' + month + year + 'rmob.txt';
};
