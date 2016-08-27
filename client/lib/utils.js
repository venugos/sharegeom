
// This is not entirely correct. We should be getting the
// bounding box and limiting movement. Doesn't work for a 
// line, for example.
//
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


module.exports = {
  dragBoundFunc: dragBoundFunc,
};
