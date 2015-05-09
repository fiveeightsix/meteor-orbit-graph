var React = require('react');
 
var AvailableDataStore = require('../stores/AvailableDataStore.js');
var SelectionStore = require('../stores/SelectionStore.js');
var MODataSelectActionCreators = require('../actions/MODataSelectActionCreators.js');
var utils = require('../utils/utils');

var DataTable = require('./DataTable.jsx');


function getStateFromStores() {
  return {
    availableData: AvailableDataStore.get(),
    selection: SelectionStore.get()
  };
}


var DataControls = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AvailableDataStore.addAvailableListener(this.onDataAvailable);
    SelectionStore.addChangeListener(this.onSelectionChange);
  },

  componentWillUnmount: function() {
    AvailableDataStore.removeAvailableListener(this.onDataAvailable);
    SelectionStore.removeChangeListener(this.onSelectionChange);
  },

  /**
   * Event handler for 'available' events from the store.
   * This should only run once.
   */
  onDataAvailable: function() {
    this.setState(getStateFromStores());
  },

  onSelectionChange: function() {
    this.setState(getStateFromStores());
  },
  
  makeTableRowOnClick: function(row) {
    var handler = function(event) {
      MODataSelectActionCreators.selectData(row);
    };
    return handler.bind(this);
  },

  render: function() {

    return(
      <div className="controls">
        <DataTable data={this.state.availableData}
                   columns={['observerID', 'year']}
                   columnLabels={['Observer ID', 'Year']}
                   makeRowOnClick={this.makeTableRowOnClick}
                   selected={this.state.selection} />
      </div>
    );
  }

});


module.exports = DataControls;
