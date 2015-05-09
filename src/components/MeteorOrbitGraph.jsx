var React = require('react/addons');
var moment = require('moment');

var utils = require('../utils/utils.js');
var DataStore = require('../stores/DataStore.js');
var SelectionStore = require('../stores/SelectionStore.js');

var ArcSegment = require('./ArcSegment.jsx');
var RadialLine = require('./RadialLine.jsx');
var MonthLabels = require('./MonthLabels.jsx');
var ShowerLabels = require('./ShowerLabels.jsx');
var Days = require('./Days.jsx');
var HeatScale = require('./HeatScale.jsx');
var CenterLegend = require('./CenterLegend.jsx');


function getStateFromStores() {
  return {
    yearData: DataStore.get(),
    selection: SelectionStore.get()
  };
}


var MeteorOrbitGraph = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this.onDataChange);
    SelectionStore.addChangeListener(this.onDataChange);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this.onDataChange);
    SelectionStore.removeChangeListener(this.onDataChange);
  },
 
  onDataChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {

    var centerX = this.props.width * 0.45;
    var centerY = this.props.height / 2;
    
    var styles = {
      fontFamily: 'sans-serif',
      fontSize: 'medium'
    };

    return (
      <svg className="meteor-orbit-graph"
           width={this.props.width}
           height={this.props.height}
           viewBox={'0 0 ' + this.props.width + ' ' + this.props.height}>
        <g style={styles}>
        <MonthLabels year={this.state.selection.year}
                     centerX={centerX}
                     centerY={centerY}
                     innerR={this.props.innerRadius - 6}
                     outerR={this.props.innerRadius} />
        <ShowerLabels year={this.state.selection.year}
                      centerX={centerX}
                      centerY={centerY}
                      innerR={this.props.outerRadius + 2}
                      outerR={this.props.outerRadius + 14} />
        <Days centerX={centerX}
              centerY={centerY}
              innerR={this.props.innerRadius + 2}
              outerR={this.props.outerRadius}
              year={this.state.selection.year}
              data={this.state.yearData.data} />
        <HeatScale x={this.props.width * 0.85}
                   y={centerY - 100}
                   width={20}
                   height={200}
                   ticks={20}
                   data={this.state.yearData.data} />
        <CenterLegend x={centerX}
                      y={centerY}
                      year={this.state.selection.year}
                      data={this.state.yearData.meta} />
        </g>
      </svg>
    );
  }

});


module.exports = MeteorOrbitGraph;
