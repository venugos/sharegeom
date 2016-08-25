var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');

var onLayerClick = function (evt) {
  console.log("Drag End", evt.target.attrs);
};

var onDragMove = function (evt) {
  console.log("Drag Move", evt.target.attrs);
};

/// From server JSON data, create Konva elements and return them
/// 
var createShapeElements = function (shapeDocs) {
  return shapeDocs.map(function (shapeDoc, index) {
    if (shapeDoc.data.className === 'Rect') {
      return <ReactKonva.Rect {...shapeDoc.data.attrs}/>;
    }
    if (shapeDoc.data.className === 'Circle') {
      return <ReactKonva.Circle {...shapeDoc.data.attrs}/>;
    }
  });
};

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapes: []
    };
  },

  componentDidMount: function () {
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', {$sort: {score: -1}});
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      //console.log("Query results: ", query.results);
      comp.setState({ shapes: createShapeElements(query.results) });
    }
  },

  render: function () {
    console.log("Rendering shapes: ", this.state.shapes);
    return (
      <div className="stage">
        <ReactKonva.Stage height={600} width={600}>
          <ReactKonva.Layer listening={true} onDragEnd={onLayerClick} onDragMove={onDragMove}>
            { this.state.shapes }
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div>
    );
  }
});

module.exports = Canvas;
