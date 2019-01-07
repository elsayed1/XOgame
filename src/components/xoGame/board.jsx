import React from "react";

function Square(props) {
  let x = <i class="fa fa-close play one" />;
  let o = <i class="fa fa-circle-o play two" />;
  return (
    <div className="square" onClick={props.onClick}>
      {props.value ? (props.value === "X" ? x : o) : ""}
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="game-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="game-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="game-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
export default Board;
