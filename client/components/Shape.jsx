var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var lib = require('../lib/utils');

// A couple of globals to store current dargged shape props
let curDragTargetAttrs;
let curDoc;

/// On drag end update the arguments
///
var onDragEnd = function (evt) {
  handleMove(evt.target.attrs);
};

/// On drag start, save the current state of the shape
///
var onDragStart = function (shapeDoc, evt) {
  curDragTargetAttrs = evt.target.attrs;
  curDoc = shapeDoc;
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
  curDoc.submitOp(op, function (err) {
    if (err) {
      return console.error(err);
    }
  });
};

/// From the server shape document data, create a corresponding
/// React-Konva element for rendering
/// 
var createShapeElement = function (shapeDoc) {
  if (shapeDoc.data.className === 'Rect') {
    return <ReactKonva.Rect {...shapeDoc.data.attrs}
      dragBoundFunc={lib.dragBoundFunc}
      onDragStart={onDragStart.bind(this, shapeDoc) }
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  };
  if (shapeDoc.data.className === 'Circle') {
    return <ReactKonva.Circle {...shapeDoc.data.attrs}
      dragBoundFunc={lib.dragBoundFunc}
      onDragStart={onDragStart.bind(this, shapeDoc) }
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  };
  if (shapeDoc.data.className === 'Line') {
    return <ReactKonva.Line {...shapeDoc.data.attrs}
      dragBoundFunc={lib.dragBoundFunc}
      onDragStart={onDragStart.bind(this, shapeDoc) }
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  }
  if (shapeDoc.data.className === 'Text') {
    return <ReactKonva.Text {...shapeDoc.data.attrs}
      dragBoundFunc={lib.dragBoundFunc}
      onDragStart={onDragStart.bind(this, shapeDoc) }
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  }
};

var Shape = React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
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
    this.props.doc.unsubscribe();
  },

  render: function () {
    return createShapeElement(this.props.doc);
  }
});

module.exports = Shape;