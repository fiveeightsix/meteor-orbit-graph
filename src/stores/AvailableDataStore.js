var EventEmitter = require('events').EventEmitter;
var util = require('util');
var assign = require('object-assign');

var MODispatcher = require('../dispatcher/MODispatcher.js');
var ActionTypes = require('../constants/MOConstants').ActionTypes;


var AVAILABLE_EVENT = 'available';

var availableData = [];


var AvailableDataStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(AVAILABLE_EVENT);
  },

  addAvailableListener: function(callback) {
    this.on(AVAILABLE_EVENT, callback);
  },

  removeAvailableListener: function(callback) {
    this.removeListener(AVAILABLE_EVENT, callback);
  },

  get: function() {
    return availableData;
  }
  
});


AvailableDataStore.dispatchToken = MODispatcher.register(function(action) {

  switch (action.type) {

  case ActionTypes.RECEIVE_AVAILABLE_DATA:
    availableData = action.data;
    AvailableDataStore.emitChange();
    break;

  default:
    // Do nothing.

  } 
  
});


module.exports = AvailableDataStore;
