import React, { memo, Fragment } from "react";

//images
import logo from "../images/logo-full.png";

const Game = memo(() => {
  return (
    <Fragment>
      <div className="container mb-5">
        <div className="main-content">
          <div className="logo d-flex justify-content-center">
            <img src={logo} alt="pokemon_logo" />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

Game.displayName = "Game";

export default Game;
