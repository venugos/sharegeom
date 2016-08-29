var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');
var uuid = require('node-uuid');
var _ = require('underscore');
var lib = require('../lib/utils');

/// A set of pre-defined palette shapes and even a UI Line
/// masquerading as a separator
//
var palette = [
  <ReactKonva.Rect key="rect" x={30} y={35} width={40} height={40} stroke="blue"
    strokeWidth={5} opacity={0.5} paletteItem={true}/>,
  <ReactKonva.Circle key="circ" x={150} y={55} radius={20} stroke="red"
    strokeWidth={5} opacity={0.5} paletteItem={true}/>,
  <ReactKonva.Text key="text1" x={200} y={50} text="text" fontSize={16}
    fontFamily="Helvetica Neue" fontStyle="bold" fill="darkgray"
    paletteItem={true}/>,
  <ReactKonva.Line key="line1" points={[300, 40, 320, 65]} stroke="green"
    strokeWidth={5} opacity={0.5} paletteItem={true}/>,
  <ReactKonva.Line key="line2" points={[10, 100, 590, 100]} stroke="darkgray"
    opacity={0.5}/> // Not exactly a palette item
];

/// The Canvas class. Palettes are Konva canvas elements themselves but behave
/// differently from 'content' items
//
var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: []
    };
  },

  /// Subscribe to the server collection and fetch items when the
  /// collection updates
  //
  componentDidMount: function () {
    var comp = this;
    var query = this.props.connection.createSubscribeQuery('shapes', { });
    query.on('ready', update);
    query.on('changed', update);

    function update () {
      comp.setState({ shapeDocs: query.results });
    }

    // Send a dummy message down the socket so that the connection
    // is kept alive in a deployed scenarion such as Heroku, which
    // will otherwise get closed in about a minute.
    setInterval(function () {
      comp.props.connection.send({ message: "Keep me alive!" });
    }, 30000);
  },

  /// Handle click events on the layer so we can clone palette shapes
  /// and create server shape documents
  //
  handleClick: function (evt) {
    var attrs = evt.target.attrs;
    if (!attrs.paletteItem) {
      return; // Not a palette item
    }

    var clonedAttrs = {};
    _.extend(clonedAttrs, attrs);

    clonedAttrs.x = attrs.x + 10;
    clonedAttrs.y = attrs.y + 10;
    clonedAttrs.id = uuid.v1();
    clonedAttrs.draggable = true;
    clonedAttrs.dragBoundFunc = lib.dragBoundFunc;

    delete clonedAttrs.paletteItem;
    delete clonedAttrs.sceneFunc;

    // Get/create a server doc for the new element and stuff data into it
    var doc = this.props.connection.get("shapes", clonedAttrs.id);
    doc.create({
      key: clonedAttrs.id,
      attrs: clonedAttrs,
      className: evt.target.className
    });
  },

  /// Render palette and content shapes
  //
  render: function () {
    var shapeNodes = this.state.shapeDocs.map(function (shapeDoc) {
      return <Shape doc={shapeDoc} key={shapeDoc.data.key} />;
    });

    var paletteNodes = palette.map(function (node) {
      return node;
    });

    return (
      <div className= "stage" >
        <ReactKonva.Stage height={600} width={600}>
          <ReactKonva.Layer listening={true}
          onClick={this.handleClick}
          key="layer">
            {paletteNodes}
            {shapeNodes}
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div >
    );
  }
});

module.exports = Canvas;
