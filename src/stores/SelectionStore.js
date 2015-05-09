var EventEmitter = require('events').EventEmitter;
var util = require('util');
var assign = require('object-assign');

var MODispatcher = require('../dispatcher/MODispatcher.js');
var ActionTypes = require('../constants/MOConstants').ActionTypes;


var CHANGE_EVENT = 'selection-change';

var selection = {
  observerID: null,
  year: null
};


var SelectionStore = assign({}, EventEmitter.prototype, {

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
    return selection;
  }

});


SelectionStore.dispatchToken = MODispatcher.register(function(action) {

  switch (action.type) {
    
  case ActionTypes.SELECT_DATA:
    selection = action.data;
    SelectionStore.emitChange();
    break;

  default:
    // Do nothing.

  }

});


module.exports = SelectionStore;
