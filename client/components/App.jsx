
var React = require('react');
var ReactDOM = require('react-dom');
var Canvas = require('./Canvas.jsx');
var className = require('classnames');

var App = props => (
  <div className="app">
    <div className="outer">
      <h1 className="title">ShareGeom</h1>
      <Canvas connection={props.connection}/>
    </div>
  </div>
);

module.exports = App;
