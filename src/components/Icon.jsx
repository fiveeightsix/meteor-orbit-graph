// Icon components. Requires fontawesome.

var React = require('react');


var Icon = React.createClass({
  render: function() {
    var classes = "fa ";
    classes += this.props.icon;
    return (
      <i className={classes} />
    );
  }
});
    

var SortAscending = React.createClass({
  render: function() {
    return (
      <Icon icon="fa-caret-up" />
    );
  }
});


var SortDescending = React.createClass({
  render: function() {
    return (
      <Icon icon="fa-caret-down" />
    );
  }
});


exports.SortAscending = SortAscending;
exports.SortDescending = SortDescending;
