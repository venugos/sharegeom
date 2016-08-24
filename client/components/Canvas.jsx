var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');

var className = require('classnames');


var Canvas = () => (
  <div className="stage">
    <ReactKonva.Stage height={300} width={300}>
        <ReactKonva.Layer>
          <ReactKonva.Rect x={100} y={100} width={50} height={50} fill="black" />
        </ReactKonva.Layer>
      </ReactKonva.Stage>
  </div>
);

module.exports = Canvas;