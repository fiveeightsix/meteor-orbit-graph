var React = require('react');
var utils = require('../utils/utils.js');


var RadialLine = React.createClass({

  propTypes: {
    centerX: React.PropTypes.number.isRequired,
    centerY: React.PropTypes.number.isRequired,
    innerR: React.PropTypes.number.isRequired,
    outerR: React.PropTypes.number.isRequired,
    angle: React.PropTypes.number.isRequired,
    stroke: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      stroke: 'black'
    };
  },
  
  describeRadialLine: function(centerX, centerY, innerR, outerR, angle) {
    var innerPt = utils.polarToCartesian(angle, innerR, centerX, centerY);  
    var outerPt = utils.polarToCartesian(angle, outerR, centerX, centerY);

    var d = [
      'M', innerPt.x, innerPt.y,
      'L', outerPt.x, outerPt.y
    ].join(' ');

    return d;
  },
  
  render: function() {
    
    var d = this.describeRadialLine(
      this.props.centerX,
      this.props.centerY,
      this.props.innerR,
      this.props.outerR,
      this.props.angle
    );

    var pathStyles = {
      stroke: this.props.stroke
    };
    
    return (
      <path d={d}
            style={pathStyles}/>
    );
  }
  
});


module.exports = RadialLine;
