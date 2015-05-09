var React = require('react');
var classNames = require('classnames');
var assign = require('object-assign');
var utils = require('../utils/utils.js');

var DataTableRow = require('./DataTableRow.jsx');
var Icon = require('./Icon.jsx');
var IconSortAsc = Icon.SortAscending;
var IconSortDesc = Icon.SortDescending;


var ASCENDING = 'ascending';
var DESCENDING = 'descending';


var DataTableHead = React.createClass({
  
  render: function() {

    var cells = this.props.columnLabels.map(function(label, i) {

      var icon;
      var classes = classNames(
        utils.attributeSafe(label),
        {'sort-by': (i === this.props.sortBy)}
      );

      if (i === this.props.sortBy) {
        switch (this.props.sortOrder) {
          case ASCENDING:
            icon = <IconSortAsc />;
            break;
          case DESCENDING:
            icon = <IconSortDesc />;
            break;
          default:
            // no icon
        }
      }
      
      return (
        <td className={classes}
            key={i}
            onClick={this.props.makeHeaderOnClick(i)}>
          <span>{label}</span>
          {icon}
        </td>
      );
    }, this);
    
    return(
      <tr className={this.props.sortOrder}>
        {cells}
      </tr>
    );
  }
  
});


var DataTable = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    columnLabels: React.PropTypes.array,
    makeRowOnClick: React.PropTypes.func,
    selected: React.PropTypes.object
  },    

  getInitialState: function() {
    return {
      sortBy: 0,
      sortOrder: ASCENDING,
      selected: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // Update the currently selected row.
    this.setState({selected: nextProps.selected});
  },

  toggleSortOrder: function() {
    var newOrder = this.state.sortOrder === ASCENDING ? DESCENDING : ASCENDING;
    this.setState({sortOrder: newOrder});
  },

  setSortBy: function(i) {
    this.setState({sortBy: i});
  },
  
  sortedData: function() {
    var data = this.props.data.map(function(d) { return assign({}, d); });
    var key = this.props.columns[this.state.sortBy];
    var sortedData;
    
    switch (this.state.sortOrder) {
      case ASCENDING:
        sortedData = this.sortAscending(data, key);
        break;
      case DESCENDING:
        sortedData = this.sortDescending(data, key);
        break;
      default:
        sortedData = data; // This shouldn't happen!
    }
    
    return sortedData;
  },
    
  sortDataByKey: function(data, key, func) {
    data.sort(function(a, b) {
      return func(a[key], b[key]);
    });
    return data;
  },

  sortAscending: function(data, key) {
    return this.sortDataByKey(data, key, function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  },

  sortDescending: function(data, key) {
    return this.sortDataByKey(data, key, function(a, b) {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
  },

  makeHeaderOnClick: function(i) {
    var handler = function(event) {
      // If we're already sorting by this column, then the
      // intention is to change sort order.
      if (i === this.state.sortBy) {
        this.toggleSortOrder();
      }
      else {
        this.setSortBy(i);
      }
    };
    return handler.bind(this);
  },
  
  render: function() {
    
    var rows = this.sortedData().map(function(row, i) {
      
      var isSelected = false;
      var rowOnClick = this.props.makeRowOnClick ? this.props.makeRowOnClick(row) : null;

      if (this.state.selected) {
        isSelected = this.props.columns.every(function(key) {
          return this.state.selected.hasOwnProperty(key) && row[key] === this.state.selected[key];
        }, this);
      }

      return (
        <DataTableRow key={i}
                      columns={this.props.columns}
                      rowData={row}
                      rowOnClick={rowOnClick}
                      isSelected={isSelected} />
      );
    }, this);
    
    return(
      <div>
      <table>
        <thead>
          <DataTableHead columnLabels={this.props.columnLabels}
                         sortBy={this.state.sortBy}
                         sortOrder={this.state.sortOrder}
                         makeHeaderOnClick={this.makeHeaderOnClick} />
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    );
  }
  
});


module.exports = DataTable;
