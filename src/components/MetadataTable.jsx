var React = require('react');

var DataStore = require('../stores/DataStore.js');
var SelectionStore = require('../stores/SelectionStore.js');

var DataTableRow = require('./DataTableRow.jsx');


function getStateFromStores() {
  return {data: DataStore.get()};
}
    

var MetadataTable = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this.onDataChange);
  },

  onDataChange: function() {
    this.setState(getStateFromStores());
  },
  
  render: function() {

    var rows = this.state.data.meta.map(function(row, i) {
      return (
        <DataTableRow key={i}
                      columns={['key', 'value']}
                      rowData={row} />
      );
    }, this);

    return(
      <div>
        <table className="metadata-table">
          {rows}
        </table>
      </div>
    );
  }
  
});


module.exports = MetadataTable;
