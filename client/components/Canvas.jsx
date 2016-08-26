var React = require('react');
var ReactDOM = require('react-dom');
var ReactKonva = require('react-konva');
var className = require('classnames');
var Shape = require('./Shape.jsx');
var uuid = require('node-uuid');


var dragBoundFunc = function (pos) {

  // y 
  if (pos.y < 30) {
    pos.y = 30;
  } else if (pos.y > 570) {
    pos.y = 570;
  }
  // x 
  if (pos.x < 30) {
    pos.x = 30;
  } else if (pos.x > 570) {
    pos.x = 570;
  }
  // return  
  return {
    x: pos.x,
    y: pos.y
  };
};

// var createClonedElement = function (cloneObj) {

//   if (cloneObj.getClassName() === "Circle") {
//     return <ReactKonva.Circle {...cloneObj.getAttrs() } dragBoundFunc={dragBoundFunc} draggable="true"/>;
//   }
//   if (cloneObj.getClassName() === "Rect") {
//     return <ReactKonva.Rect {...cloneObj.getAttrs() } dragBoundFunc={dragBoundFunc} draggable="true"/>;
//   }
//   if (cloneObj.getClassName() === "Text") {
//     return <ReactKonva.Text {...cloneObj.getAttrs() } dragBoundFunc={dragBoundFunc} draggable="true"/>;
//   }
//   if (cloneObj.getClassName() === "Line") {
//     return <ReactKonva.Line {...cloneObj.getAttrs() } dragBoundFunc={dragBoundFunc} draggable="true"/>;
//   }
//   else {
//     console.log("not identified obj");
//   }
// };


// var createClonedElement = function (cloneAttrs, name) {
//   if (name === "Circle") {
//     return <ReactKonva.Circle {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={onDragEnd} draggable="true"/>;
//   }
//   if (name === "Rect") {
//     return <ReactKonva.Rect {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={onDragEnd} draggable="true"/>;
//   }
//   if (name === "Text") {
//     return <ReactKonva.Text {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={onDragEnd} draggable="true"/>;
//   }
//   if (name === "Line") {
//     return <ReactKonva.Line {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={onDragEnd} draggable="true"/>;
//   }
//   else {
//     console.log("not identified obj");
//   }
// };

var palette = [
  <ReactKonva.Rect x={30} y={35} width={40} height={40} stroke='blue' strokeWidth={5} opacity={0.5} p={true}/>,
  <ReactKonva.Circle x={150} y={55} radius={20}  stroke='red' strokeWidth={5} opacity={0.5} p={true}/>,
  <ReactKonva.Text x={200} y={50} text="text" fontSize={16} fontFamily="Helvetica Neue" fontStyle="bold" fill="darkgray" p={true}/>,
  <ReactKonva.Line points={[300, 40, 320, 65]} stroke='green' strokeWidth={5} opacity={0.5} p={true}/>,
  <ReactKonva.Line points={[10, 100, 590, 100]} stroke='darkgray' opacity={0.5} p={true}/>
]

var Canvas = React.createClass({
  getInitialState: function () {
    return {
      shapeDocs: [],
      paletteShapes: [],
      shapes: []
    };
  },

  onDragEnd: function (evt) {
    
    for (var i = 0; i < this.state.shapes.length; ++i) {
      if (_.contains(this.state.shapes[i], evt.target.id)) {
        this.state.shapes[i] = evt.target;
        break;
      }
    }
    //this.state.shapes[evt.target.id] = evt.target;
    this.setState({ shapes: this.state.shapes });

    console.log(onDragEnd);
  },

  componentDidMount: function () {
    console.log(palette);
    var comp = this;
    var query = connection.createSubscribeQuery('shapes', { $sort: { score: -1 } });
    query.on('ready', update);
    query.on('changed', update);

    function update() {
      console.log("Query results: ", query.results);
      comp.setState({ shapeDocs: query.results });
    }
    comp.setState({ paletteShapes: palette });
  },

 

  // handleClick: function (evt) {
  //   console.log("event is ", evt);
  //   if (!evt.target.attrs.p) {
  //     console.log("Returnibg from handle click ", evt.target.attrs);
  //     return;
  //   }

  //   var clone = evt.target.clone({
  //     x: 200,
  //     y: 400,
  // 		id: uuid.v1(),
  // 		draggable: "true",
  //   });

  //   delete clone.attrs.p;

  //   console.log("created the clone of ", clone.getClassName());
  //   console.log("id of clone is", clone.getId());
  //   clone.setAttr('draggable', true);

  //   clone.off('click');
  //   //clone.setListening(false);
  //   //func call 
  //   this.state.shapes.push(createClonedElement(clone));
  //   console.log("shapes cloned are", this.state.shapes);
  //   this.setState({ shapes: this.state.shapes });
  // },

   createClonedElement: function (cloneAttrs, name) {
    if (name === "Circle") {
      return <ReactKonva.Circle {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={this.onDragEnd} draggable="true"/>;
    }
    if (name === "Rect") {
      return <ReactKonva.Rect {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={this.onDragEnd} draggable="true"/>;
    }
    if (name === "Text") {
      return <ReactKonva.Text {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={this.onDragEnd} draggable="true"/>;
    }
    if (name === "Line") {
      return <ReactKonva.Line {...cloneAttrs } dragBoundFunc={dragBoundFunc} onDragEnd={this.onDragEnd} draggable="true"/>;
    }
    else {
      console.log("not identified obj");
    }
  },

  handleClick: function (evt) {
    console.log("event is ", evt);
    if (!evt.target.attrs.p) {
      console.log("Returnibg from handle click ", evt.target.attrs);
      return;
    }

    var attrs = evt.target.attrs;
    var cloneAttrs = {};
    for (var prop in attrs) 
      if (typeof prop !== 'function') 
        cloneAttrs[prop] = attrs[prop];

    cloneAttrs.x = 200;
    cloneAttrs.y = 400;
    cloneAttrs.id= uuid.v1();

    // console.log("created the clone of ", clone.getClassName());
    // console.log("id of clone is", clone.getId());
    //clone.setAttr('draggable', true);
    delete cloneAttrs.p;

    // clone.off('click');
    //clone.setListening(false);
    //func call 
    this.state.shapes[cloneAttrs.id] = (createClonedElement(cloneAttrs, evt.target.className));
    //console.log("shapes cloned are", this.state.shapes);
    this.setState({ shapes: this.state.shapes });
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
