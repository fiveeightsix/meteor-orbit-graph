var request = require('superagent');
var fs = require('fs');
var moment = require('moment');
var util = require('util');

var utils = require('../src/utils.js');
var RMOB = require('../rmob/rmob.js');
var ParseError = require('../rmob/ParseError.js');


var observers = ['_aav_', 'brower', 'booth', 'camps', 'dubois', 'hvezdarna_svakov', 'saito'];
var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var years = ['2012', '2013', '2014', '2015'];

var data = {}; // Store collected data.
var dataDir = '../data'; // Write output files here.
var combinations = cartesianProduct([observers, years, months]);
var pending = combinations.length; // Track number of requests to be sent.
var dataList = []; // List of the available sets.


combinations.forEach(function(combination) {

  var observerID = combination[0];
  var year = combination[1];
  var month = combination[2];
  var url = RMOB.makeDataURL(observerID, year, month);
  
  request
    .get(url)
    .set('Accept', 'text/plain')
    .buffer(true)
    .parse(responseParser)
    .end(function(err, res) {
      var dataSet; // Data from the current request.
      var fileKey;
      
      console.log('Request', url);
      
      if (res.ok) { // This is always true, as RMOB server always returns 200(?).
        try {  
          console.log(res.text);
          dataSet = RMOB.parse(res.text);

          if (dataSet) {
            console.log('Data found');

            // Assign the data set under what should be a unique identifier.
            fileKey = [observerID + '_' + year];

            if (data.hasOwnProperty(fileKey)) {
              data[fileKey].data.push(sumMonth(year, month, dataSet.data));
            }
            else {
              data[fileKey] = {
                data: [sumMonth(year, month, dataSet.data)],
                meta: dataSet.meta
              };
              // Add the data set to the list of sets available              
              dataList.push({year: year, observerID: observerID});
            }
          }

        }
        catch (e) {

          // ParseErrors mean something is wrong with the file, so all we need
          // to do is to log it and move on. Other errors still need to propagate.
          if (e instanceof ParseError) {
            console.log('Invalid RMOB data file: ' + e.message);
          }
          else {
            throw e;
          }

        }

      }
      else {
        console.log(url, 'NOOOO!!!', err);
      }

      // Mark another completed request.
      pending -= 1;
      console.log('Pending', pending);

      // If all the requests have completed, write out the files.
      if (pending <= 0) {
        console.log('All requests finished.');
        writeDataToFiles(data);
        fs.writeFileSync(dataDir + '/available_data.json', JSON.stringify(dataList));
      }
      
    });

});


// Run when all data is collected.
function writeDataToFiles(data) {
  for (var dataID in data) {  
    // Flatten the data array so all months are together.
    data[dataID].data = [].concat.apply([], data[dataID].data);
          console.log(data[dataID].meta);
    fs.writeFileSync(
      dataDir + '/' + dataID + '.json',
      JSON.stringify(data[dataID])
    );
  }
}


function sumMonth(year, month, monthData) {
  return monthData.map(function(hourlyCounts, i) {
    // Arrays start at 0, days start at 1.
    var day = i + 1;

    // moment is parsed from a string to trigger leap year validation.
    var date = moment([year, month, day].join('-'), 'YYYY-MM-DD');

    // Don't bother counting if the date isn't valid.
    var count = (date.isValid()) ? hourlyCounts.reduce(utils.sum) : null;
    
    return {
      date: date.format('YYYY-MM-DD'),
      count: count
    };
    
  })
    // Discard invalid dates.
    .filter(function(day) { return day.date !== 'Invalid date'; });
}
    

function cartesianProduct(arrays) {
  if (arrays.length === 1) {
    return arrays[0];
  }
  else {
    var first = arrays[0];
    var remaining = cartesianProduct(arrays.slice(1));
    return first.map(function(m) {
      return remaining.map(function(n) {
        return [m].concat(n);
      });
    }).reduce(function(a, b) { return a.concat(b); });
  }
}


function responseParser(res, fn){
  res.text = '';
  res.setEncoding('binary');
  res.on('data', function(chunk) {
    res.text += chunk.toString('binary');
  });
  res.on('end', fn);
}
