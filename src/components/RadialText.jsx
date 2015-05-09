var React = require('react');

var utils = require('../utils/utils.js');


var RadialText = React.createClass({

  propTypes: {
    centerX: React.PropTypes.number.isRequired,
    centerY: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    inside: React.PropTypes.bool,
    anchorEnd: React.PropTypes.bool,
    fontSize: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      inside: false,
      anchorEnd: false,
      fontSize: 'medium'
    };
  },
  
  render: function() {

    var position = utils.polarToCartesian(
      this.props.angle,
      this.props.radius,
      this.props.centerX,
      this.props.centerY
    );
    
    var rotation = this.props.inside ? (90 + Number(this.props.angle)) : (Number(this.props.angle) - 90);

    var transform = 'rotate(' + rotation + ' ' + position.x + ' ' + position.y +  ')';

    var textStyle = {
      dominantBaseline: 'central',
      textAnchor: (this.props.anchorEnd ? 'end' : 'start'),
      fontSize: this.props.fontSize
    };

    return (
      <text transform={transform}
            x={position.x}
            y={position.y}
            style={textStyle}>
        {this.props.text}
      </text>
    );
  }
  
});


module.exports = RadialText;
