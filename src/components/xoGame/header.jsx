import React, { Component } from "react";
class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Tic Tac Toe</h1>
        <div class="players-box">
          <div class="player-one">
            <img
              class="img-fluid thumbnails"
              src="http://www14.0zz0.com/2018/09/06/01/737650752.png"
              alt="avatar"
            />
            <h2 class="player-name">Player 1</h2>
          </div>
          <div class="computer">
            <h2 class="player-name">Computer</h2>
            <img
              class="img-fluid thumbnails"
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
