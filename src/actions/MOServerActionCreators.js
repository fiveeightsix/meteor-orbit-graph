var MODispatcher = require('../dispatcher/MODispatcher.js');
var ActionTypes = require('../constants/MOConstants').ActionTypes;

var MOWebAPI = require('../utils/MOWebAPI.js');


module.exports = {

  receiveData: function(data) {
    MODispatcher.dispatch({
      type: ActionTypes.RECEIVE_DATA,
      data: data
    });
  },  
  
  receiveAvailableData: function(availableData) {

    MODispatcher.dispatch({
      type: ActionTypes.RECEIVE_AVAILABLE_DATA,
      data: availableData
    });

    // Once we have the list of available data, select the 
    // first item as the initial data set to display.
    
    MODispatcher.dispatch({
      type: ActionTypes.SELECT_DATA,
      data: availableData[0]
    });

    MOWebAPI.getData(
      availableData[0].observerID,
      availableData[0].year,
      function(err, res) {
        this.receiveData(res.body);
      }.bind(this)
    );
  }
  
};
