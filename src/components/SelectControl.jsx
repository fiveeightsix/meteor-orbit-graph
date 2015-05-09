var React = require('react');


var SelectControl = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    noneValue: React.PropTypes.oneOfType([
      React.PropTypes.boolean,
      React.PropTypes.string
    ])
  },

  getDefaultProps: function() {
    return {noneValue: false};
  },

  getInitialState: function() {  
    return {
      options: this.prependNoneValue(this.props.options),
      selected: null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({options: this.prependNoneValue(nextProps.options)});
  },

  /**
   * Returns options with the none value added to the beginning
   * the array, if one has been given.
   */
  prependNoneValue: function(options) {
    if (this.props.noneValue) {
      options.unshift(this.props.noneValue);
    }
    return options;
  },
  
  handleChange: function(event) {
    var newValue = this.refs.menu.getDOMNode().value;
    this.setState({selected: newValue});
    this.props.handleChange(newValue);
  },
  
  render: function() {

    var optionElements = this.state.options.map(function(option, i) {
      return (
        <option key={i}
                value={option}>
          {option}
        </option>
      );
    }, this);

    return (
      <select ref="menu"
              name={this.props.name}
              value={this.state.selected}
              onChange={this.handleChange}>
        {optionElements}
      </select>
    );
  }

});


module.exports = SelectControl;
