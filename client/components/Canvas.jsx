var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');
var uuid = require('node-uuid');


var createClonedElement =function(cloneObj){
  
  if(cloneObj.getClassName() === "Circle"){
     return <ReactKonva.Circle {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc}/>;
  }
  if(cloneObj.getClassName() === "Rect"){
     return <ReactKonva.Rect {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc}/>;
  }
  if(cloneObj.getClassName() === "Text"){
     return <ReactKonva.Text {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc}/>;
  }
  else{
    console.log("not identified obj");
  }
    //}
};

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: [],
      shapes :[]
    };
  },

  componentDidMount: function () {
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', { $sort: { score: -1 } });
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      console.log("Query results: ", query.results);
      comp.setState({ shapeDocs: query.results });
    }
  },

  handleClick :function(evt) {
  	var clone=evt.target.clone({
  		  x: 40,
  		  id: uuid.v1()
       })
  	console.log("created the clone of ",clone.getClassName());
  	console.log("id of clone is",clone.getId());
  	
  	var cloneattr=clone.getAttrs();
  	//func call 
  	var node = 
  	this.state.shapes.push(createClonedElement(clone));
      this.setState({shapes: this.state.shapes});
    },

  render: function () {
    // var { players, selectedPlayerId } = this.props;
    // var other = _.omit(this.shapes, 'players', 'selectedPlayerId');
    var shapeNodes = this.state.shapeDocs.map(function (shapeDoc, index) {
      return <Shape doc={shapeDoc} key={shapeDoc.data.key} />;
    });

    return (
      <div className= "stage" >
        <ReactKonva.Stage  height={600} width={600}>
          <ReactKonva.Layer listening={true} onClick={this.handleClick}>
            {shapeNodes}
            {this.state.shapes}
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div >
    );
  }
});

module.exports = Canvas;
