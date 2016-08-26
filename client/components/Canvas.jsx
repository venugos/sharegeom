var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');

var palette = [
 <ReactKonva.Rect x={30} y={35} width={40} height={40} stroke='blue' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Circle x={150} y={55} radius={20}  stroke='red' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Text x={200} y={50} text="text" fontSize={16} fontFamily="Helvetica Neue" fontStyle="bold" fill="darkgray"/>,
 <ReactKonva.Line points={[300, 40, 320, 65]} stroke='green' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Line points={[10, 100, 590, 100]} stroke='darkgray' opacity={0.5}/>
 ]

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: [],
      paletteShapes: []
    };
  },

  componentDidMount: function () {
    console.log(palette);
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', { $sort: { score: -1 } });
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      console.log("Query results: ", query.results);
      comp.setState({ shapeDocs: query.results });
    }
    comp.setState({ paletteShapes: palette });
  },

  render: function () {
    // var { players, selectedPlayerId } = this.props;
    // var other = _.omit(this.shapes, 'players', 'selectedPlayerId');
    

    var shapeNodes = this.state.shapeDocs.map(function (shapeDoc, index) {
      return <Shape doc={shapeDoc} key={shapeDoc.data.key} />;
    });

    var paletteNodes = this.state.paletteShapes.map(function (item) {
      return item;
    });

    return (
      <div className= "stage" >
        <ReactKonva.Stage  height={600} width={600}>
          <ReactKonva.Layer listening={true}>
            {paletteNodes}
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div >
    );
  }
});

module.exports = Canvas;
