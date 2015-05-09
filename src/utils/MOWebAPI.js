var request = require('superagent');


function getDataURL(observerID, year) {
  return 'data/' + observerID + '_' + year + '.json';
}


module.exports = {

  getData: function(observerID, year, callback) {
    request.get(getDataURL(observerID, year))
      .accept('application/json')
      .end(callback);
  },

  getAvailableData: function(callback) {
    request.get('data/available_data.json')
      .accept('application/json')
      .end(callback);
  }

};
