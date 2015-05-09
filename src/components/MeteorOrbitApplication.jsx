var React = require('react');

var MeteorOrbitGraph = require('./MeteorOrbitGraph.jsx');
var DataControls = require('./DataControls.jsx');
var MetadataTable = require('./MetadataTable.jsx');


var MeteorOrbitApplication = React.createClass({

  render: function() {
    return (
      <div>
        <div className="section">
          <DataControls />
        </div>
        <div className="section">
          <MeteorOrbitGraph width={this.props.width}
                            height={this.props.height}
                            innerRadius={this.props.innerRadius}
                            outerRadius={this.props.outerRadius} />
        </div>
        <div className="section">
          <MetadataTable />
        </div>
      </div>
    );
  }
  
});


module.exports = MeteorOrbitApplication;
