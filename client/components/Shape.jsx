var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');

var curDragTargetAttrs;

/// On drag end update the arguments
///
var onDragEnd = function (evt) {
  handleMove(evt.target.attrs);
};

/// On drag start, save the current state of the shape
///
var onDragStart = function (evt) {
  curDragTargetAttrs = evt.target.attrs;
};

/// On drag move try and update 
/// 
var onDragMove = function (evt) {
  handleMove(evt.target.attrs);
};

/// Send operations to the server
/// 
var handleMove = function (shape) {
  var op = [{ p: ['attrs'], od: curDragTargetAttrs, oi: shape }];
  connection.get('shapes', shape.id).submitOp(op, function (err) {
    if (err) {
      return console.error(err);
    }
  });
};

var createShapeElement = function (shapeDoc) {
  console.log("Creating shape component!");
  if (shapeDoc.data.className === 'Rect') {
    return <ReactKonva.Rect {...shapeDoc.data.attrs}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  }
  if (shapeDoc.data.className === 'Circle') {
    return <ReactKonva.Circle
      {...shapeDoc.data.attrs}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  };
};

var Shape = React.createClass({
  propTypes: {
    doc: React.PropTypes.object.isRequired,
  },

  componentDidMount: function () {
    var comp = this;
    var doc = comp.props.doc;
    doc.subscribe();
    doc.on('load', update);
    doc.on('op', update);
    function update() {
      // `comp.props.doc.data` is now updated. re-render component.
      comp.forceUpdate();
    }
  },

  componentWillUnmount: function () {
    this.doc.unsubscribe();
  },

  render: function () {
    return createShapeElement(this.props.doc);
  }
});

module.exports = Shape;