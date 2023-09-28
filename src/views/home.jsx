import React, { Fragment, memo } from "react";

import { Link } from "react-router-dom";

//images
import logo from "../assets/images/logo-full.png";
import pokeball from "../assets/images/pokeball.png";
import greatball from "../assets/images/great-ball.png";
import masterball from "../assets/images/master-ball.png";
import ultraball from "../assets/images/ultra-ball.png";

import { Button } from "react-bootstrap";

const Home = memo(() => {
  return (
    <Fragment>
      <div className="container mb-5">
        <div className="main-content">
          <div className="logo d-flex justify-content-center">
            <img src={logo} alt="pokemon_logo" />
          </div>
          <div className="instructions d-flex flex-column justify-content-center align-items-center mt-4">
            <h1 className="how-to-title text-center text-firey">
              How to Play the Game!!!
            </h1>
            <div className="instruction-steps">
              <ol className="list-group list-group-numbered">
                <h3 className="text-primary">Step 1: Game Start</h3>
                <li className="list-group-item">
                  Begin the Game by clicking{" "}
                  <Link to="/game">
                    <Button variant="primary" className="text-firey">
                      Start Game
                    </Button>
                  </Link>
                </li>
              </ol>
              <ol className="list-group list-group-numbered">
                <h3 className="text-primary">Step 2: Initial Guess</h3>
                <li className="list-group-item">
                  You start with 7 chances to guess the Pokémon correctly.
                </li>
                <li className="list-group-item">
                  Make your first guess by typing the name of a Pokémon into the
                  input field provided.
                </li>
                <li className="list-group-item">
                  Click the <span className="text-secondary">Submit</span>{" "}
                  button to submit your guess.
                </li>
              </ol>
              <ol className="list-group list-group-numbered">
                <h3 className="text-primary">Step 3: Hint Feedback</h3>
                <li className="list-group-item">
                  After submitting your guess, the game will provide feedback:
                </li>
                <ul className="list-group ms-5">
                  <li className="ms-3 mt-3 mb-2">
                    If your guess is correct, you win the game, and the game
                    congratulates you.
                  </li>
                  <li className="ms-3 mt-3 mb-2">
                    If your guess is incorrect, the game provides hints to help
                    you guess correctly in your next attempt.
                  </li>
                </ul>
              </ol>
              <ol className="list-group list-group-numbered">
                <ul className="list-group">
                  <h3 className="text-primary">Step 4: Using Hints</h3>
                  <li className="ms-3 mt-3 mb-2 d-flex align-items-center">
                    <img
                      src={masterball}
                      alt="master-ball"
                      className="pokeball me-2"
                    />{" "}
                    :
                    <h5 className="ms-2 mt-2">
                      This indicates that the guess is correct.
                    </h5>
                  </li>
                  <li className="ms-3 mt-3 mb-2 d-flex align-items-center">
                    <img
                      src={pokeball}
                      alt="poke-ball"
                      className="pokeball me-2"
                    />{" "}
                    :
                    <h5 className="ms-2 mt-2">
                      This indicates that the guess is incorrect.
                    </h5>
                  </li>
                  <li className="ms-3 mt-3 mb-2 d-flex align-items-center">
                    <img
                      src={greatball}
                      alt="great-ball"
                      className="pokeball me-2"
                    />{" "}
                    :
                    <h5 className="ms-2 mt-2">
                      This indicates that the guessed value is lower.
                    </h5>
                  </li>
                  <li className="ms-3 mt-3 mb-2 d-flex align-items-center">
                    <img
                      src={ultraball}
                      alt="ultra-ball-ball"
                      className="pokeball me-2"
                    />{" "}
                    :
                    <h5 className="ms-2 mt-2">
                      This indicates that the guessed value is greater.
                    </h5>
                  </li>
                </ul>
              </ol>
              <ol className="list-group list-group-numbered">
                <h3 className="text-primary">
                  Step 5: Multiple Attempts and Reveal
                </h3>
                <li className="list-group-item">
                  After submitting your guess, the game will provide feedback:
                </li>
                <ul className="list-group ms-5">
                  <li className="ms-3 mt-3 mb-2">
                    Continue guessing Pokémon names based on the hints provided.
                  </li>
                  <li className="ms-3 mt-3 mb-2">
                    You have a total of 7 chances to guess the correct Pokémon.
                  </li>
                  <li className="ms-3 mt-3 mb-2">
                    If you exhaust all 7 chances without guessing correctly, the
                    game will reveal the Pokémon's identity.
                  </li>
                </ul>
              </ol>
            </div>
            <h4 className="text-firey">That's it! Enjoy the Game!!!</h4>
            <Link to="/game">
              <Button variant="primary" className="text-firey" size="lg">
                Start Game
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

Home.displayName = "Home";
export default Home;
