var React = require('react');
var moment = require('moment');

var utils = require('../utils/utils.js');

var RadialLine = require('./RadialLine.jsx');
var RadialText = require('./RadialText.jsx');


var MonthLabels = React.createClass({
  
  render: function() {
    var daysScale = utils.scale([0, utils.daysInYear(this.props.year)], [0, 360]);
    var monthEndpoints = calculateMonthEndPoints(this.props.year);
    var styles = {
      stroke: 'black',
      fill: 'none'
    };
    
    var monthTicks = monthEndpoints.map(function(month, i) {
      var tickAngle = daysScale(month[0]);
      return (
        <g>
          <RadialLine key={i}
                      centerX={this.props.centerX}
                      centerY={this.props.centerY}
                      innerR={this.props.innerR}
                      outerR={this.props.outerR}
                      angle={tickAngle} />
        </g>
      );
    }, this);

    var monthNames = monthEndpoints.map(function(month, i) {
      var textAngle = daysScale(((month[1] - month[0]) / 2) + month[0]);
      return (
        <RadialText key={i}
                    centerX={this.props.centerX}
                    centerY={this.props.centerY}
                    radius={194}
                    angle={textAngle}
                    text={utils.monthAbbrs[i]}
                    anchorEnd={true} />
      );
    }, this);

    return (
      <g className="months-scale">
        <g style={styles}>
          <circle cx={this.props.centerX}
                  cy={this.props.centerY}
                  r={this.props.outerR} />
          {monthTicks}
        </g>
        <g>
          {monthNames}
        </g>
      </g>
    );
  }
  
});


function calculateMonthEndPoints(year) {
  var year = Number(year);
  var days = [];
  var m;
  var monthDate;
  for (m = 0; m < 12; m++) {
    monthDate = moment.utc({year: year, month: m});
    days.push([
      monthDate.startOf('month').dayOfYear(),
      monthDate.endOf('month').dayOfYear()
    ]);
  }
  return days;
}


module.exports = MonthLabels;
