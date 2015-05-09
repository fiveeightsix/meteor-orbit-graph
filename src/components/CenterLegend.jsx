var React = require('react');


var CenterLegend = React.createClass({

  getMetaKey: function(key) {
    var meta = this.props.data.filter(function(m) {
      return m.hasOwnProperty('key') && m.key == key;
    });
    return (meta.length > 0) ? meta[0].value : '';
  },
  
  render: function() {

    var translate = 'translate(' + this.props.x + ', ' + this.props.y + ')';
    var styles = {
      textAnchor: 'middle',
      fontSize: 'small'
    };
    var yearStyles = {
      fontSize: 'large'
    };

    return (
      <g className="legend"
         transform={translate}
         style={styles}>
        <text className="year"
              y="-20"
              style={yearStyles}>
          {this.props.year}
        </text>
        <text className="observer"
              y="0">
          {this.getMetaKey('Observer')}
        </text>
        <text className="lat-long"
              y="20">
          {this.getMetaKey('Latitude') + ', ' + this.getMetaKey('Longitude')}
        </text>
      </g>
    );
  }

});


module.exports = CenterLegend;
