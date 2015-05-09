var React = require('react');
var utils = require('../utils/utils.js');

var LinearAxis = require('./LinearAxis.jsx');


var HeatScale = React.createClass({

  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    ticks: React.PropTypes.number.isRequired,
    data: React.PropTypes.array.isRequired
  },               

  render: function() {
    var translate = 'translate(' + this.props.x + ', ' + this.props.y + ')';
    var axisTranslate = 'translate(' + (Number(this.props.width) + 2) + ', 0)';
    var maxValue = utils.max(this.props.data, function(d) { return d.count; });
    var unitScale = utils.scale([0, this.props.ticks], [0, maxValue]);
    var colourScale = utils.scale([0, maxValue], [0, 1]);
    var units = utils.range(1, Number(this.props.ticks) + 1).map(unitScale);
    var unitHeight = this.props.height / this.props.ticks;

    var unitElements = units.reverse().map(function(u, i) {
      var unitY = unitHeight * i;
      var unitStyle = {
        fill: 'rgba(0, 255, 0, ' + colourScale(u) + ')'
      };
      
      return (
        <rect key={i}
              x={0}
              y={unitY}
              width={this.props.width}
              height={unitHeight}
              style={unitStyle}>
          <title>
            {Math.ceil(u)}
          </title>
        </rect>
      );
    }, this);

    return (
      <g className="heat-scale"
         transform={translate}>
        <g>
          {unitElements}
        </g>
        <g transform={axisTranslate}>
          <LinearAxis length={this.props.height}
                      depth={6}
                      range={[0, maxValue]}/>
        </g>
      </g>
    );

  }

});


module.exports = HeatScale;
