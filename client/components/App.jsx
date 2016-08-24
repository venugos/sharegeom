var React = require('react');
var ReactDOM = require('react-dom');

var App = () => (
  <div className="app">
    <div className="outer">
      <div className="logo"></div>
      <h1 className="title">Leaderboard</h1>
      <div className="subtitle">Select a scientist to give them points</div>
      <Canvas/>
    </div>
  </div>
);

module.exports = App;

