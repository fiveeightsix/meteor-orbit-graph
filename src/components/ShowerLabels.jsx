var React = require('react');
var moment = require('moment');

var utils = require('../utils/utils.js');
var showerDates = require('../constants/showerDates.js');

var RadialLine = require('./RadialLine.jsx');
var RadialText = require('./RadialText.jsx');


var ShowerLabel = React.createClass({

  render: function() {
    return (
      <g>
        <RadialLine centerX={this.props.centerX}
                    centerY={this.props.centerY}
                    innerR={this.props.innerR}
                    outerR={this.props.outerR}
                    angle={this.props.angle} />
        <RadialText centerX={this.props.centerX}
                    centerY={this.props.centerY}
                    radius={this.props.textRadius}
                    angle={this.props.angle}
                    text={this.props.text}
                    fontSize="small" />
      </g>
    );
  }
  
});


var ShowerLabels = React.createClass({

  render: function() {
    var daysScale = utils.scale([0, utils.daysInYear(this.props.year)], [0, 360]);
    var textRadius = Number(this.props.outerR) + 2;
    
    var showerTicks = showerDates.map(function(shower, i) {
      
      var peakDateObj = {
        year: Number(this.props.year),
        month: Number(shower.peak.month - 1), // Months are 0 indexed
        day: Number(shower.peak.day)
      };
      var tickAngle = daysScale(moment(peakDateObj).dayOfYear());

      return (
        <ShowerLabel key={shower.name}
                     centerX={this.props.centerX}
                     centerY={this.props.centerY}
                     innerR={this.props.innerR}
                     outerR={this.props.outerR}
                     textRadius={textRadius}
                     angle={tickAngle}
                     text={shower.name} />
      );

    }, this);

    return (
      <g className="showers">
        {showerTicks}
      </g>
    );
  }

});


module.exports = ShowerLabels;

