import React, { Fragment, memo, useState } from "react";

//images
//images
import pokeball from "../assets/images/pokeball.png";
import greatball from "../assets/images/great-ball.png";
import masterball from "../assets/images/master-ball.png";
import ultraball from "../assets/images/ultra-ball.png";

const Guess = memo((props) => {
  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="me-2">
          {props.guessGeneration === props.pokeGeneration ? (
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball"
            />
          ) : props.guessGeneration > props.pokeGeneration ? (
            <img
              src={ultraball}
              alt="guessed_too_high"
              className="img-fluid pokeball"
            />
          ) : (
            <img
              src={greatball}
              alt="guess_too_low"
              className="img-fluid pokeball"
            />
          )}
          <p className="ms-1 text-capitalize">gen</p>
        </div>
        {/* {props.type1 === "match" ? (
          <img src={masterball} alt="correct_guess" />
        ) : (
          <img src={pokeball} alt="unmaatched" />
        )}
        {props.type2 === "match" ? (
          <img src={masterball} alt="correct_guess" />
        ) : (
          <img src={pokeball} alt="unmaatched" />
        )}
        {props.height === "match" ? (
          <img src={masterball} alt="correct_guess" />
        ) : props.height === "higer" ? (
          <img src={ultraball} alt="guess_is_higher" />
        ) : (
          <img src={greatball} alt="guess_is_lower" />
        )}
        {props.weight === "match" ? (
          <img src={masterball} alt="correct_guess" />
        ) : props.height === "higer" ? (
          <img src={ultraball} alt="guess_is_higher" />
        ) : (
          <img src={greatball} alt="guess_is_lower" />
        )} */}
      </div>
    </Fragment>
  );
});

Guess.displayName = "Guess";
export default Guess;
