var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');

var onLayerClick = function (props) {
  console.log("Clicked!!")
}


var Canvas = (props) => {
  console.log(props);
    return  (
    <div className="stage">
      <ReactKonva.Stage height={600} width={600}>
          <ReactKonva.Layer >
            { props.shapes } 
          </ReactKonva.Layer>
        </ReactKonva.Stage>
    </div>
  );
}



module.exports = Canvas;

