var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: []
    };
  },

  componentDidMount: function () {
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', { $sort: { score: -1 } });
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      console.log("Query results: ", query.results);
      comp.setState({ shapeDocs: query.results });
    }
  },

  render: function () {
    // var { players, selectedPlayerId } = this.props;
    // var other = _.omit(this.shapes, 'players', 'selectedPlayerId');
    var shapeNodes = this.state.shapeDocs.map(function (shapeDoc, index) {
      return <Shape doc={shapeDoc} key={shapeDoc.data.key} />;
    });

    return (
      <div className= "stage" >
        <ReactKonva.Stage  height={600} width={600}>
          <ReactKonva.Layer listening={true}>
            {shapeNodes}
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div >
    );
  }
});

module.exports = Canvas;
