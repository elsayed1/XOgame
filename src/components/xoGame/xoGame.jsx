import React from "react";
import Board from "./board";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  startGame = () => {
    const history = this.state.history.slice(0, 1);
    this.setState({ history, stepNumber: 0 });
  };

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  makeComputerPlay(squares) {
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push([]);
      for (let j = 0; j < 3; j++)
        arr[i][j] =
          squares[i * 3 + j] === "X" ? 1 : squares[i * 3 + j] === "O" ? 2 : 0;
    }
    let computerPos = this.solve(arr) - 1;
    console.log(computerPos);
    this.computerClick(computerPos);
  }
  // Solve Function
  solve(arr) {
    let bestPath = new Array(3);
    let score = 0,
      penalty = 0,
      solutionCell = 0;
    if (arr[1][1] == 0) return 5;
    for (let i = 0; i < 3; i++) {
      penalty = 0;
      let s = 0;
      for (let j = 0; j < 3; j++)
        if (arr[i][j] === 0) ++s;
        else if (arr[i][j] === 2) s += 2;
        else ++penalty;
      if (penalty === 2 && s === 1) {
        for (let j = 0; j < 3; j++)
          if (arr[i][j] === 0) solutionCell = i * 3 + j + 1;
      }
      if (s > score && s !== 4 && s !== 4) {
        score = s;
        bestPath[0] = i * 3 + 1;
        bestPath[1] = i * 3 + 2;
        bestPath[2] = i * 3 + 3;
      }
    }
    for (let i = 0; i < 3; i++) {
      penalty = 0;
      let s = 0;
      for (let j = 0; j < 3; j++)
        if (arr[j][i] === 0) ++s;
        else if (arr[j][i] === 2) s += 2;
        else ++penalty;
      if (penalty === 2 && s === 1) {
        for (let j = 0; j < 3; j++)
          if (arr[j][i] == 0) solutionCell = j * 3 + i + 1;
      }
      if (s > score && s !== 4) {
        score = s;
        bestPath[0] = 0 * 3 + i + 1;
        bestPath[1] = 1 * 3 + i + 1;
        bestPath[2] = 2 * 3 + i + 1;
      }
    }
    let s = 0;
    penalty = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i][i] == 0) ++s;
      else if (arr[i][i] == 2) s += 2;
      else ++penalty;
    }
    if (penalty == 2 && s === 1) {
      for (let j = 0; j < 3; j++)
        if (arr[j][j] == 0) solutionCell = j * 3 + j + 1;
    }
    if (s > score && s !== 4) {
      score = s;
      bestPath[0] = 1;
      bestPath[1] = 5;
      bestPath[2] = 9;
    }
    s = 0;
    penalty = 0;
    for (let i = 0; i < 3; i++) {
      if (arr[i][2 - i] == 0) ++s;
      else if (arr[i][2 - i] == 2) s += 2;
      else ++penalty;
    }
    if (penalty == 2 && s === 1) {
      for (let j = 0; j < 3; j++)
        if (arr[j][2 - j] == 0) solutionCell = j * 3 + (2 - j) + 1;
    }
    if (s > score && s !== 4) {
      score = s;
      bestPath[0] = 3;
      bestPath[1] = 5;
      bestPath[2] = 7;
    }
    if (score === 5) {
      for (let i = 0; i < 3; i++) {
        let row = Math.ceil(bestPath[i] / 3) - 1;
        let column = Math.trunc(bestPath[i] - row * 3 - 1);
        console.log(bestPath);
        console.log(row, column);
        if (arr[row][column] === 0) return bestPath[i];
      }
    } else if (solutionCell != 0) {
      return solutionCell;
    } else {
      for (let i = 0; i < 3; i++) {
        let row = Math.ceil(bestPath[i] / 3) - 1;
        let column = Math.ceil(bestPath[i] - row * 3 - 1);
        console.log(row, column, bestPath);
        if (arr[row][column] === 0) return bestPath[i];
      }
    }
  }
  computerClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    if (!this.state.xIsNext && this.state.stepNumber < 9)
      this.makeComputerPlay(current.squares);
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + (winner === "X" ? winner : "Computer");
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "Computer");
    }

    return (
      <div className="game-page">
        <div className="game-table">
          <button className="btn btn-primary" onClick={this.startGame}>
            start Game
          </button>
          <Header />
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
