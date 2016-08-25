var http = require("http");
var ShareDB = require("sharedb");
var connect = require("connect");
var serveStatic = require('serve-static');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocketJSONStream = require('websocket-json-stream');
var WebSocket = require('ws');
var util = require('util');
var Duplex = require('stream').Duplex;

// Start ShareDB
var share = ShareDB({db: new ShareDBMingoMemory()});

// Create a WebSocket server
var app = connect();
app.use(serveStatic('client/public'));
var server = http.createServer(app);
var wss = new WebSocket.Server({server: server});
server.listen(8080);
console.log("Listening on http://localhost:8080");

// Connect any incoming WebSocket connection with ShareDB
wss.on('connection', function(ws, req) {
  var stream = new WebSocketJSONStream(ws);
  share.listen(stream);
});

// // Create initial documents
// {
//   "attrs":{ "width":600, "height":600 },"className":"Stage", "children":[
//     {
//       "attrs": {}, "className": "Layer", "children": [
//         { "attrs": { "x": 20, "y": 20, "radius": 10, "stroke": "black", "opacity": 0.5, "id": "06cd3a10-6a80-11e6-a419-2d4513a4e8d9", "draggable": true }, "className": "Circle" },
//         { "attrs": { "x": 100, "y": 100, "width": 50, "height": 70, "stroke": "black", "opacity": 0.5, "id": "06cd6120-6a80-11e6-a419-2d4513a4e8d9", "draggable": true }, "className": "Rect" }]
//     }]
// }

var connection = share.connect();
connection.createFetchQuery('players', {}, {}, function(err, results) {
  if (err) { throw err; }

  if (results.length === 0) {
    var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
                 "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];

    names.forEach(function(name, index) {
      var doc = connection.get('players', ''+index);
      var data = {name: name, score: Math.floor(Math.random() * 10) * 5};
      doc.create(data);
    });
  }
});
