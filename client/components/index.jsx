var React = require('react');
var ReactDOM = require('react-dom');
var sharedb = require('sharedb/lib/client');
var App = require('./App.jsx');
var Init = require('./initdoc');

/* global window, document; */

// Open WebSocket connection to ShareDB server
let connection = new sharedb.Connection(
  new WebSocket('ws://' + window.location.host));

// Use this when committing to heroku and lose the commit
// let connection = new sharedb.Connection(
// new WebSocket('wss://' + window.location.host));

// Expose to index.html
window.renderApp = function () {
   // Init();
  ReactDOM.render(<App connection={connection}/>,
    document.querySelector('#app'));
};
