import React from "react";
import Board from "./board";
import Header from "./header";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function MsgPage(props) {
  return (
    <div className="msg-page">
      <div className="msg">
        <div className="msg-p" />
        <button className="rest-game" onClick={props.startGame}>
          Want to play again
        </button>
      </div>
    </div>
  );
}
class Game extends React.Component {
  state = {
    origBoard: Array.from(Array(9).keys())
  };

  render() {
    const winner =
      this.checkWin(this.origBoard, "O") || this.checkWin(this.origBoard, "X");
    let status;
    if (winner) {
      status = "Winner: " + (winner === "X" ? winner.player : "Computer");
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "Computer");
    }

    return (
      <div className="game-page">
        <div className="game-table">
          <button className="btn btn-primary" onClick={this.startGame}>
            start Game
          </button>
          <div>{status}</div>
          <Header />
          <Board
            squares={this.state.origBoard}
            onClick={i => this.turnClick(i)}
          />
          <MsgPage startGame={this.startGame} />
        </div>
      </div>
    );
  }
  huPlayer = "X";
  aiPlayer = "O";
  origBoard = this.state.origBoard;
  startGame = () => {
    document.querySelector(".msg-page").style.display = "none";

    this.origBoard = Array.from(Array(9).keys());
    this.setState({
      origBoard: this.origBoard
    });
  };
  turnClick(square) {
    if (typeof this.origBoard[square] == "number") {
      this.turn(square, this.huPlayer);
      if (!this.checkWin(this.origBoard, this.huPlayer) && !this.checkTie())
        this.turn(this.bestSpot(), this.aiPlayer);
    }
  }

  turn(squareId, player) {
    let gameWon = this.checkWin(this.origBoard, player);
    if (gameWon) {
      this.gameOver(gameWon);
      return;
    }
    this.origBoard[squareId] = player;
    this.setState({
      origBoard: this.origBoard
    });
  }

  checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
    let gameWon = null;
    for (let [index, win] of lines.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index: index, player: player };
        this.winner = player;
        break;
      }
    }
    return gameWon;
  }

  gameOver(gameWon) {}

  declareWinner(who) {
    document.querySelector(".msg-page").style.display = "block";
    document.querySelector(".msg-p").innerHTML = who;
  }

  emptySquares() {
    return this.origBoard.filter(s => typeof s == "number");
  }

  bestSpot() {
    return this.minimax(this.origBoard, this.aiPlayer).index;
  }

  checkTie() {
    if (this.emptySquares().length == 0) {
      for (var i = 0; i < this.origBoard.length; i++) {}
      this.declareWinner("<p>Tie Game!</p>");
      return true;
    }
    return false;
  }

  minimax(newBoard, player) {
    var availSpots = this.emptySquares();

    if (this.checkWin(newBoard, this.huPlayer)) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, this.aiPlayer)) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == this.aiPlayer) {
        var result = this.minimax(newBoard, this.huPlayer);
        move.score = result.score;
      } else {
        var result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);
    }

    var bestMove;
    if (player === this.aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }
}

// ========================================
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

export default Game;
