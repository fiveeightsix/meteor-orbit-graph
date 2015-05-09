var React = require('react/addons');
var moment = require('moment');
var request = require('superagent');

var utils = require('../utils/utils.js');

var ArcSegment = require('./ArcSegment.jsx');
var RadialLine = require('./RadialLine.jsx');
var MonthLabels = require('./MonthLabels.jsx');
var ShowerLabels = require('./ShowerLabels.jsx');
var Days = require('./Days.jsx');
var HeatScale = require('./HeatScale.jsx');
var CenterLegend = require('./CenterLegend.jsx');
var DataControls = require('./DataControls.jsx');


var MeteorOrbit = React.createClass({

  getDataURL: function() {
    return 'data/' + this.state.observerID + '_' + this.state.year + '.json';
  },
  
  loadDataFile: function() {
    request.get(this.getDataURL())
           .accept('application/json')
           .end(function(err, res) {
             this.setState({yearData: res.body});
           }.bind(this));
  },

  loadAvailableData: function() {

  },
  
  getInitialState: function() {
    return {
      year: '2014',
      observerID: '_aav_',
      availableData: [],
      yearData: {data: [], meta: []}
    };
  },

  componentDidMount: function() {
    this.loadAvailableData();
  },
  
  handleObserverIDOnChange: function(newValue) {
    this.setState({observerID: newValue});
    this.loadDataFile();
  },

  handleYearOnChange: function(newValue) {
    this.setState({year: newValue});
    this.loadDataFile();
  },

  render: function() {

    var centerX = this.props.width / 2;
    var centerY = this.props.height / 2;
    
    return (
      <div>
        <svg className="meteor-orbit"
             width={this.props.width}
             height={this.props.height}
             viewBox={'0 0 ' + this.props.width + ' ' + this.props.height}>
          <MonthLabels year={this.state.year}
                       centerX={centerX}
                       centerY={centerY}
                       innerR="194"
                       outerR="200" />
          <ShowerLabels year={this.state.year}
                        centerX={centerX}
                        centerY={centerY}
                        innerR="242"
                        outerR="260" />
          <Days centerX={centerX}
                centerY={centerY}
                innerR="202"
                outerR="240"
                year={this.state.year}
                data={this.state.yearData.data} />
          <HeatScale x={this.props.width - 80}
                     y={centerY - 100}
                     width="20"
                     height="200"
                     ticks="20"
                     data={this.state.yearData.data} />
          <CenterLegend x={centerX}
                        y={centerY}
                        year={this.state.year}
                        data={this.state.yearData.meta} />
        </svg>
        <DataControls year={this.state.year}
                      observerID={this.state.observerID}
                      observerIDOnChange={this.handleObserverIDOnChange}
                      yearOnChange={this.handleYearOnChange} />
        <pre>App state: <br /><br />{JSON.stringify(this.state, 0, 2)}</pre>
      </div>
    );
  }

});


module.exports = MeteorOrbit;
