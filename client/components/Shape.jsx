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

var dragBoundFunc = function (pos) {

  // y 
 if (pos.y < 30) {
  pos.y = 30;
 } else if (pos.y > 570) {
  pos.y = 570;
 } 
 // x 
 if (pos.x < 30) {
  pos.x = 30;
 } else if (pos.x > 570) {
  pos.x = 570;
 }  
 // return  
 return {
    x: pos.x,
    y: pos.y
  };
};

var createClonedElement =function(cloneObj){
  
  if(cloneObj.getClassName() === "Circle"){
     return <ReactKonva.Circle {...cloneObj.getAttrs()} dragBoundFunc={dragBoundFunc}/>;
  }
  if(cloneObj.getClassName() === "Rect"){
     return <ReactKonva.Rect {...cloneObj.getAttrs()} dragBoundFunc={dragBoundFunc}/>;
  }
  if(cloneObj.getClassName() === "Text"){
     return <ReactKonva.Text {...cloneObj.getAttrs()} dragBoundFunc={dragBoundFunc}/>;
  }
  else{
    console.log("not identified obj");
  }
    //}
};



var createShapeElement = function (shapeDoc) {
  if (shapeDoc.data.className === 'Rect') {
    return <ReactKonva.Rect {...shapeDoc.data.attrs}
      dragBoundFunc={dragBoundFunc}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  }
  if (shapeDoc.data.className === 'Circle') {
    return <ReactKonva.Circle
      {...shapeDoc.data.attrs}
      dragBoundFunc={dragBoundFunc}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  };
  if (shapeDoc.data.className === 'Line') {
    return <ReactKonva.Line {...shapeDoc.data.attrs}
      dragBoundFunc={dragBoundFunc}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}/>;
  }
  if (shapeDoc.data.className === 'Text') {
    return <ReactKonva.Text {...shapeDoc.data.attrs}
      dragBoundFunc={dragBoundFunc}
      onDragStart={onDragStart}
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
    this.doc.unsubscribe();
  },

  render: function () {
    return createShapeElement(this.props.doc);
  }
});

module.exports = Shape;