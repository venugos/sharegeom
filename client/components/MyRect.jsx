var React = require('react');
var ReactDOM = require('react-dom');

class MyRect extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  }
  render() {
    return (
      <ReactKonva.Rect
        x={10} y={10} width={50} height={50}
        fill={this.state.color}
        shadowBlur={10}
        onClick={this.handleClick}
        />
    );
  }
}