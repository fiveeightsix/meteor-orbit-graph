var EventEmitter = require('events').EventEmitter;
var util = require('util');
var assign = require('object-assign');

var MODispatcher = require('../dispatcher/MODispatcher.js');
var ActionTypes = require('../constants/MOConstants').ActionTypes;


var CHANGE_EVENT = 'data-change';

var data = {data: [], meta: []}; // Blank data structure


var DataStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function() {
    return data;
  }

});


DataStore.dispatchToken = MODispatcher.register(function(action) {

  switch (action.type) {

  case ActionTypes.RECEIVE_DATA:
    data = action.data;
    DataStore.emitChange();
    break;

  default:
    // Do nothing.

  }
  
});


module.exports = DataStore;
