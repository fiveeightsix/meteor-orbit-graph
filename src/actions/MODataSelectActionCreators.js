var MODispatcher = require('../dispatcher/MODispatcher.js');
var ActionTypes = require('../constants/MOConstants').ActionTypes;
var MOServerActionCreators = require('../actions/MOServerActionCreators.js');
var MOWebAPI = require('../utils/MOWebAPI.js');


module.exports = {

  selectData: function(data) {
    
    MODispatcher.dispatch({
      type: ActionTypes.SELECT_DATA,
      data: data
    });

    MOWebAPI.getData(
      data.observerID,
      data.year,
      function(err, res) {
        MOServerActionCreators.receiveData(res.body);
      }
    );
    
  },
  
};
