var React = require('react/addons');
var request = require('superagent');

var MOServerActionCreators = require('./actions/MOServerActionCreators.js');
var MeteorOrbitApplication = require('./components/MeteorOrbitApplication.jsx');
var MOWebAPI = require('./utils/MOWebAPI.js');


// Populate available data
MOWebAPI.getAvailableData(function(err, res) {
  MOServerActionCreators.receiveAvailableData(res.body);
});

var props = {
  width: 800,
  height: 640,
  innerRadius: 200,
  outerRadius: 240
};

React.render(
  React.createElement(MeteorOrbitApplication, props),
  document.getElementById('container')
);
