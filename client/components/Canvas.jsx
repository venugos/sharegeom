var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');

var Canvas = () => (
  <div className="stage">
    <ReactKonva.Stage width={700} height={700}/>
  </div>
);

module.exports = Canvas;