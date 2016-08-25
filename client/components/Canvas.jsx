var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');

var onLayerClick = function (evt) {
  console.log("Drag End", evt)
}

var onDragMove = function (evt) {
  console.log("Drag Move", evt)

}

var Canvas = (props) => {
  var width = $('.outer').height();
  var height = $('.outer').width();
    return  (
    <div className="stage">
      <ReactKonva.Stage height={594} width={594}>
          <ReactKonva.Layer listening={true} onDragEnd={onLayerClick} onDragMove={onDragMove}>
            { props.shapes } 
          </ReactKonva.Layer>
        </ReactKonva.Stage>
    </div>
  );
}


module.exports = Canvas;


