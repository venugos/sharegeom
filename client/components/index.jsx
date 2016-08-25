var React = require('react');
var ReactDOM = require('react-dom');
var sharedb = require('sharedb/lib/client');
var App = require('./App.jsx');
var Init = require('./initdoc');


// Open WebSocket connection to ShareDB server
connection = new sharedb.Connection(new WebSocket('ws://' + window.location.host));

// Expose to index.html
window.renderApp = function () {
   Init();
  ReactDOM.render(<App />, document.querySelector('#app'));
};
