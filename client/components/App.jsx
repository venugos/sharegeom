
var React = require('react');
var ReactDOM = require('react-dom');
var Canvas = require('./Canvas.jsx');
var Nav = require('./Nav.jsx');
var className = require('classnames');
var ReactKonva = require('react-konva');

var shapes = [
  <ReactKonva.Rect x={100} y={100} width={50} height={50} stroke='black' draggable="true" opacity={0.5}/>,
  <ReactKonva.Circle x={20} y={20} radius={10}  stroke='black' draggable="true" opacity={0.5}/>,
]

var App = () => (
  <div className="app">
    <div className="outer">
      <div className="logo"></div>
      <h1 className="title">ShareGeom</h1>
      <Nav />
      <Canvas shapes={shapes}/>
    </div>
  </div>
);

module.exports = App;
