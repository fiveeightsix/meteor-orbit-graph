var React = require('react');


var LinearAxis = React.createClass({

  propTypes: {
    length: React.PropTypes.number.isRequired,
    depth: React.PropTypes.number.isRequired,
    range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
  },
  
  render: function() {
    var d = [
      'M', this.props.depth, '0',
      'L', '0', '0',
      'L', '0', this.props.length,
      'L', this.props.depth, this.props.length, 
    ].join(' ');

    var textStyles = {
      dominantBaseline: 'central'
    };

    var pathStyles = {
      stroke: 'black',
      fill: 'transparent'
    };
    
    return (
      <g className="axis">
        <path d={d}
              style={pathStyles} />
        <text style={textStyles}
              y={this.props.length}
              x={this.props.depth + 2}>
          {this.props.range[0]}
        </text>
        <text style={textStyles}
              y={0}
              x={this.props.depth + 2}>
          {this.props.range[1]}
        </text>
      </g>
    );
  }

});


module.exports = LinearAxis;
