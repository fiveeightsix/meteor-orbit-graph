var React = require('react');
var moment = require('moment');
var utils = require('../utils/utils.js');

var ArcSegment = require('./ArcSegment.jsx');


var Days = React.createClass({
  
  render: function() {
    var maxValue = utils.max(this.props.data, function(d) { return d.count; });
    var daysScale = utils.scale([0, utils.daysInYear(this.props.year)], [0, 360]);
    var colourScale = utils.scale([0, maxValue], [0, 1]);
    
    var dayArcs = this.props.data.map(function(datum, i) {
      
      var dayNumber = moment(datum.date, 'YYYY-MM-DD', true).dayOfYear();
      var arcStyle = {
        stroke: 'none',
        fill: 'rgba(0, 255, 0, ' + colourScale(datum.count) + ')'
      };
      var arcText = datum.date + ': ' + datum.count;
      
      return (
        <ArcSegment key={i}
                    centerX={this.props.centerX}
                    centerY={this.props.centerY}
                    innerR={this.props.innerR}
                    outerR={this.props.outerR}
                    startAngle={daysScale(dayNumber - 1)}
                    endAngle={daysScale(dayNumber)}
                    style={arcStyle}
                    text={arcText} />
      );
      
    }, this);
    
    return (
      <g className="day-arcs">
        {dayArcs}
      </g>
    );
  }
  
});


module.exports = Days;
