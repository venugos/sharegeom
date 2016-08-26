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
var share = ShareDB({ db: new ShareDBMingoMemory() });

// Create a WebSocket server
var app = connect();
app.use(serveStatic('client/public'));
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });
server.listen(8080);
console.log("Listening on http://localhost:8080");

// Connect any incoming WebSocket connection with ShareDB
wss.on('connection', function (ws, req) {
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
// connection.createFetchQuery('shapes', {}, {}, function(err, results) {
//   if (err) { throw err; }

//   if (results.length === 0) {
//     var names = ["Ada Lovelace", "Grace Hopper", "Marie Curie",
//                  "Carl Friedrich Gauss", "Nikola Tesla", "Claude Shannon"];

//     names.forEach(function(name, index) {
//       var doc = connection.get('shapes', ''+index);
//       var data = {name: name, score: Math.floor(Math.random() * 10) * 5};
//       doc.create(data);
//     });
//   }
// });

connection.createFetchQuery('shapes', {}, {}, function (err, results) {
  if (err) { throw err; }

  if (results.length === 0) {
    var shapes = [
      { "attrs": { "x":50,"y":50,"radius":25,"stroke":"red","strokeWidth":5,"opacity":0.5,"id":"153f80a0-6b14-11e6-9e62-0d0025ef39ce","draggable":true},"className":"Circle"},
      { "attrs": { "x":150,"y":25,"width":50,"height":50,"stroke":"blue","strokeWidth":5,"opacity":0.5,"id":"153fcec0-6b14-11e6-9e62-0d0025ef39ce","draggable":true},"className":"Rect"},
      { "attrs": { "points":[5,20, 25, 50],"stroke":"green","lineCap":"round","lineJoin":"round","id":"67b765e1-6b10-11e6-933d-93ca88ca7b1a","draggable":true, "opacity": .5},"className":"Line"},
      { "attrs": { "points":[25,40, 25, 100],"stroke":"red","lineCap":"round","lineJoin":"round","tension":1,"id":"67b765e2-6b10-11e6-933d-93ca88ca7b1a","draggable":true},"className":"Line"},
      { "attrs": { "x":200,"y":50, "text":"text","fontSize":14,"fontFamily":"Helvetica Neue", "fontStyle":"bold", "fill":"darkgray","id":"aa87dc80-6b13-11e6-8092-552e4cc2f9f6","draggable":true},"className":"Text"}
    ];

    shapes.forEach(function (shape, index) {
      var doc = connection.get('shapes', shape.attrs.id);
      // {
      //   key: uuid,
      //     attrs: props of shape,
      //   className: type of shape  
      // }
      console.log("Shape: ", shape);
      var data = { key: shape.attrs.id, attrs: shape.attrs, className: shape.className };
      doc.create(data);
    });
  }
});