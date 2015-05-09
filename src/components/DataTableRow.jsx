var React = require('react');
var classNames = require('classnames');


var DataTableRow = React.createClass({
  
  render: function() {

    var cells = this.props.columns.map(function(column, i) {      
      return (
        <td className={classes}
            key={i}>
          {this.props.rowData[column]}
        </td>
      );
    }, this);          
    
    var classes = classNames(
      {'selected': this.props.isSelected}
    );
    
    return(
      <tr key={this.props.key}
          className={classes}
          onClick={this.props.rowOnClick}>
        {cells}
      </tr>
    );
  }
  
});


module.exports = DataTableRow;
