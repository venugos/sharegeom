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
    x: 20,
    y: 20,
    radius: 10,
    stroke: 'black',
    opacity: 0.5,
    id: uuid.v1(),
    draggable: true
  });

  // create a rectangle
  var rect = new Konva.Rect({
    x: 100,
    y: 100,
    width: 50,
    height: 70,
    stroke: 'black',
    opacity: 0.5,
    id: uuid.v1(),
    draggable: true
  });

  // add shapes to the layer
  layer.add(circle);
  layer.add(rect);

  // add the layer to the stage
  stage.add(layer);

  console.log(stage.toJSON());
};

module.exports = initDoc;