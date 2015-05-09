var moment = require('moment');

var utils = {};


utils.monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


utils.daysInYear = function(year) {
  return moment.utc({year: Number(year)}).isLeapYear() ? 366 : 365;
};


utils.polarToCartesian = function(angleInDegrees, radius, centerX, centerY) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180; // 12 o'clock is -ve y
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};


utils.scale = function(domain, image) {
  var a = (image[1] - image[0]) / (domain[1] - domain[0]);
  var b = image[0] - domain[0];
  
  var f = function(x) {
    if (x < domain[0] || x > domain[1]) {
      throw new RangeError('value ' + x + ' not in domain.');
    }
    return a * x + b;
  };

  return f;
};


utils.max = function(array, f) {
  var a = 0;
  var b;
  if (arguments.length === 1) {
    array.forEach(function(item) {
      if ((b = item) !== null && b > a) a = item;
    });      
  }
  else {
    array.forEach(function(item) {
      if ((b = f(item)) !== null && b > a) a = b;
    });
  }
  return a;
};


utils.range = function(a, b) {
  if (arguments.length === 1) {
    return Array.apply(null, Array(a)).map(function(x, i) {
      return i;
    });
  }
  else {
    return Array.apply(null, Array(b - a)).map(function(x, i) {
      return i + a;
    });
  }  
};


utils.attributeSafe = function(string) {
  return string
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
};

module.exports = utils;
