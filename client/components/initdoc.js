var Konva = require('konva');
var uuid = require('node-uuid');

var initDoc = function () {

  // first we need to create a stage
  var stage = new Konva.Stage({
    container: 'app',   // id of container <div>
    width: 600,
    height: 600
  });

  // then create layer
  var layer = new Konva.Layer();

  // create a circle
  var circle = new Konva.Circle({
    x: 50,
    y: 60,
    radius: 30,
    stroke: 'red',
    strokeWidth: 5,
    opacity: 0.5,
    id: uuid.v1(),
    draggable: true
  });

  // create a rectangle
  var rect = new Konva.Rect({
    x: 20,
    y: 150,
    width: 50,
    height: 50,
    stroke: 'blue',
    strokeWidth: 5,
    opacity: 0.5,
    id: uuid.v1(),
    draggable: true,
  });

  var line = new Konva.Line({
    points: [5, 70, 140, 250],
    stroke: 'green',
    strokeWidth: 5,
    lineCap: 'round',
    lineJoin: 'round',
    visible: true,
    id: uuid.v1(),
    draggable: true
  });

  var spline = new Konva.Line({
    x: 20,
    y: 300,
    points: [25, 40, 75],
    stroke: 'red',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
    tension : 1,
    id: uuid.v1(),
    draggable: true
  });

  var text = new Konva.Text({
    x: 20,
    y: 250,
    text: 'aut viam inveniam aut faciam',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    fontStyle: 'bold',
    fill: 'darkgray',
    id: uuid.v1(),
    draggable: true
  });

  // add shapes to the layer
  layer.add(circle);
  layer.add(rect);
  layer.add(line);
  layer.add(spline);
  layer.add(text);

  // add the layer to the stage
  stage.add(layer);

  console.log(stage.toJSON());
};

module.exports = initDoc;