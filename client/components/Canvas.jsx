var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');
var uuid = require('node-uuid');


var createClonedElement =function(cloneObj){
  
  if(cloneObj.getClassName() === "Circle"){
     return <ReactKonva.Circle {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc} draggable="true"/>;
  }
  if(cloneObj.getClassName() === "Rect"){
     return <ReactKonva.Rect {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc} draggable="true"/>;
  }
  if(cloneObj.getClassName() === "Text"){
     return <ReactKonva.Text {...cloneObj.getAttrs()} dragBoundFunc={Shape.dragBoundFunc} draggable="true"/>;
  }
  else{
    console.log("not identified obj");
  }
    //}
};

var palette = [
 <ReactKonva.Rect x={30} y={35} width={40} height={40} stroke='blue' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Circle x={150} y={55} radius={20}  stroke='red' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Text x={200} y={50} text="text" fontSize={16} fontFamily="Helvetica Neue" fontStyle="bold" fill="darkgray"/>,
 <ReactKonva.Line points={[300, 40, 320, 65]} stroke='green' strokeWidth={5} opacity={0.5}/>,
 <ReactKonva.Line points={[10, 100, 590, 100]} stroke='darkgray' opacity={0.5} />
 ]

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: [],
      paletteShapes: [],
      shapes: []
    };
  },

  componentDidMount: function () {
    console.log(palette);
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', { $sort: { score: -1 } });
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      console.log("Query results: ", query.results);
      comp.setState({ shapeDocs: query.results});
    }
    comp.setState({ paletteShapes: palette });
  },

  handleClick :function(evt) {
  	console.log("event is ",evt);
  	var clone=evt.target.clone({
  		  	x: 200,
        	y: 400,
  		  id: uuid.v1(),
  		  draggable:"true",
  	  
       })
  	console.log("created the clone of ",clone.getClassName());
  	console.log("id of clone is",clone.getId());
  	
  	clone.off('click');
  	//clone.setListening(false);
  	
  	
  	//func call 
  	
  	this.state.shapes.push(createClonedElement(clone));
  	console.log("shapes cloned are",this.state.shapes);
      this.setState({shapes: this.state.shapes});
    },

  render: function () {
    // var { players, selectedPlayerId } = this.props;
    // var other = _.omit(this.shapes, 'players', 'selectedPlayerId');
    

    var shapeNodes = this.state.shapeDocs.map(function (shapeDoc, index) {
      return <Shape doc={shapeDoc} key={shapeDoc.data.key} />;
    });

    var paletteNodes = this.state.paletteShapes.map(function (item) {
      return item;
    });

    // var shape2Nodes = this.state.shapes.map(function (item) {
    //   return item;
    // });

    return (
      <div className= "stage" >
        <ReactKonva.Stage  height={600} width={600}>
          <ReactKonva.Layer listening={true} onClick={this.handleClick}>
            {paletteNodes}
            {shapeNodes}
            {this.state.shapes}
          </ReactKonva.Layer>
        </ReactKonva.Stage>
      </div >
    );
  }
});

module.exports = Canvas;
