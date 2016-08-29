var http = require("http");
var ShareDB = require("sharedb");
var connect = require("connect");
var serveStatic = require('serve-static');
var ShareDBMingoMemory = require('sharedb-mingo-memory');
var WebSocketJSONStream = require('websocket-json-stream');
var WebSocket = require('ws');

// Start ShareDB
var share = new ShareDB({ db: new ShareDBMingoMemory() });

// Create a WebSocket server
var app = connect();
app.use(serveStatic('client/public'));
var server = http.createServer(app);
var wss = new WebSocket.Server({ server: server });

server.listen(process.env.PORT || 8080);
console.log("Listening on http://localhost:8080");

// Connect any incoming WebSocket connection with ShareDB
wss.on('connection', function (ws, req) {
  let stream = new WebSocketJSONStream(ws);
  share.listen(stream);
});

var connection = share.connect();
connection.createFetchQuery('shapes', {}, {}, function (err, results) {
  if (err) {
    throw err;
  }

  // Populate with a set of starting documents, but this is currently
  // empty. See below for some sample data.
  //
  if (results.length === 0) {
    var shapes = [];

    shapes.forEach(function (shape, index) {
      var doc = connection.get('shapes', shape.attrs.id);
      // {
      //   key: uuid,
      //   attrs: props of shape,
      //   className: type of shape
      // }

      var data = {
        key: shape.attrs.id,
        attrs: shape.attrs,
        className: shape.className
      };
      doc.create(data);
    });
  }
});

// A set of shapes to intialize the document if needed
// var shapes = [
//   { "attrs": { "x": 20, "y": 20, "radius": 10, "stroke": "turquoise", "opacity": 0.5, "id": "06cd3a10-6a80-11e6-a419-2d4513a4e8d9", "draggable": true }, "className": "Circle" },
//   { "attrs": { "x": 450, "y": 150, "width": 50, "height": 70, "stroke": "purple", "opacity": 0.5, "id": "06cd6120-6a80-11e6-a419-2d4513a4e8d9", "draggable": true }, "className": "Rect" },
//   { "attrs": { "x": 150, "y": 150, "radius": 25, "stroke": "red", "strokeWidth": 5, "opacity": 0.5, "id": "153f80a0-6b14-11e6-9e62-0d0025ef39ce", "draggable": true }, "className": "Circle" },
//   { "attrs": { "x": 400, "y": 450, "width": 50, "height": 50, "stroke": "blue", "strokeWidth": 5, "opacity": 0.5, "id": "153fcec0-6b14-11e6-9e62-0d0025ef39ce", "draggable": true }, "className": "Rect" },
//   { "attrs": { "points": [325, 20, 350, 50], "stroke": "green", "lineCap": "round", "lineJoin": "round", "id": "67b765e1-6b10-11e6-933d-93ca88ca7b1a", "draggable": true, "opacity": 0.5 }, "className": "Line" },
//   { "attrs": { "points": [25, 40, 25, 100], "stroke": "red", "lineCap": "round", "lineJoin": "round", "tension": 1, "id": "67b765e2-6b10-11e6-933d-93ca88ca7b1a", "draggable": true }, "className": "Line" },
//   { "attrs": { "x": 150, "y": 450, "text": "text", "fontSize": 24, "fontFamily": "Helvetica Neue", "fontStyle": "bold", "fill": "darkgray", "id": "aa87dc80-6b13-11e6-8092-552e4cc2f9f6", "draggable": true }, "className": "Text" },
//   { "attrs": { "x": 250, "y": 250, "radius": 60, "stroke": "yellow", "strokeWidth": 5, "opacity": 0.5, "id": "a4bda7b0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Circle" },
//   { "attrs": { "x": 250, "y": 350, "width": 50, "height": 100, "stroke": "blue", "strokeWidth": 5, "opacity": 0.5, "id": "b7c41ba0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Rect" },
//   { "attrs": { "points": [100, 20, 160, 90], "stroke": "green", "lineCap": "round", "lineJoin": "round", "id": "c548f430-6bc9-11e6-a70b-896d7a035bc9", "draggable": true, "opacity": .5 }, "className": "Line" },
//   { "attrs": { "points": [325, 300, 425, 350], "stroke": "cyan", "lineCap": "round", "lineJoin": "round", "tension": 1, "id": "cf0e05a0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Line" },
//   { "attrs": { "x": 60, "y": 300, "text": "text", "fontSize": 30, "fontFamily": "Helvetica Neue", "fontStyle": "bold", "fill": "violet", "id": "db086da0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Text" },
//   { "attrs": { "x": 350, "y": 50, "radius": 40, "stroke": "red", "strokeWidth": 5, "opacity": 0.5, "id": "e4bb56a0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Circle" },
//   { "attrs": { "x": 50, "y": 500, "width": 75, "height": 40, "stroke": "brown", "strokeWidth": 5, "opacity": 0.5, "id": "ede587a0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Rect" },
//   { "attrs": { "points": [75, 125, 175, 250], "stroke": "green", "lineCap": "round", "lineJoin": "round", "id": "f9b1b3b0-6bc9-11e6-a70b-896d7a035bc9", "draggable": true, "opacity": .5 }, "className": "Line" },
//   { "attrs": { "points": [125, 60, 25, 100], "stroke": "salmon", "lineCap": "round", "lineJoin": "round", "tension": 1, "id": "02c835a0-6bca-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Line" },
//   { "attrs": { "x": 450, "y": 75, "text": "text", "fontSize": 20, "fontFamily": "courier", "fontStyle": "bold", "fill": "navy", "id": "0fc2f6a0-6bca-11e6-a70b-896d7a035bc9", "draggable": true }, "className": "Text" }
// ];
