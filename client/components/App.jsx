
var React = require('react');
var ReactDOM = require('react-dom');
var Canvas = require('./Canvas.jsx');
var Nav = require('./Nav.jsx');
var className = require('classnames');
var ReactKonva = require('react-konva');



var shapes = [
<ReactKonva.Rect x={25} y={50} width={50} height={50} stroke='black' draggable="true" strokeWidth={5} opacity={0.5}/>,
<ReactKonva.Circle x={50} y={150} radius={30}  stroke='blue' draggable="true" strokeWidth={5} opacity={0.5}/>,
]



var App = () => (
  <div className="app">
    <div className="outer">
      <h1 className="title">ShareGeom</h1>
      <Canvas shapes={shapes}/>
    </div>
  </div>
);

module.exports = App;
