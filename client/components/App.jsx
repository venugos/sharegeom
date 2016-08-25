
var React = require('react');
var ReactDOM = require('react-dom');
var Canvas = require('./Canvas.jsx');
var Nav = require('./Nav.jsx');
var className = require('classnames');

var App = () => (
  <div className="app">
    <div className="outer">
      <h1 className="title">ShareGeom</h1>
      <Canvas/>
    </div>
  </div>
);

module.exports = App;
