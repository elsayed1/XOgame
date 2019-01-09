import React, { Component } from "react";
class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Tic Tac Toe</h1>
        <div className="players-box">
          <div className="player-one">
            <img
              className="img-fluid thumbnails"
              src="http://www14.0zz0.com/2018/09/06/01/737650752.png"
              alt="avatar"
            />
            <h2 className="player-name">Player 1</h2>
          </div>
          <div className="computer">
            <h2 className="player-name">Computer</h2>
            <img
              className="img-fluid thumbnails"
              src="http://www14.0zz0.com/2018/09/06/01/176250477.png"
              alt="avatar"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
