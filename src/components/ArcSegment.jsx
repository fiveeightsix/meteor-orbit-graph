var React = require('react');
var utils = require('../utils/utils.js');


function describeArcSegment(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) {
  var outerStart = utils.polarToCartesian(startAngle, outerRadius, centerX, centerY);
  var outerEnd = utils.polarToCartesian(endAngle, outerRadius, centerX, centerY);

  // Start and end angles are reversed, as the inner stroke is being drawn
  // in the opposite direction to the outer.
  var innerStart = utils.polarToCartesian(endAngle, innerRadius, centerX, centerY);
  var innerEnd = utils.polarToCartesian(startAngle, innerRadius, centerX, centerY);
  
  var largeArc = (endAngle - startAngle <= 180) ? '0' : '1';
  
  var d = [
    'M', outerStart.x, outerStart.y,
    'A', outerRadius, outerRadius, '0', largeArc, '1', outerEnd.x, outerEnd.y,
    'L', innerStart.x, innerStart.y,
    'A', innerRadius, innerRadius, '0', largeArc, '0', innerEnd.x, innerEnd.y,
    'Z'
  ].join(' ');

  return d;
}


var ArcSegment = React.createClass({

  propTypes: {
    centerX: React.PropTypes.number.isRequired,
    centerY: React.PropTypes.number.isRequired,
    innerR: React.PropTypes.number.isRequired,
    outerR: React.PropTypes.number.isRequired,
    startAngle: React.PropTypes.number.isRequired,
    endAngle: React.PropTypes.number.isRequired,
    style: React.PropTypes.object
  },

  render: function() {
    var d = describeArcSegment(
      this.props.centerX,
      this.props.centerY,
      this.props.innerR,
      this.props.outerR,
      this.props.startAngle,
      this.props.endAngle
    );

    var titleElem = (this.props.text) ? <title>{this.props.text}</title> : '';
    
    return (
      <path d={d}
            style={this.props.style}>
        {titleElem}
      </path>
    );
  }

});


module.exports = ArcSegment;
