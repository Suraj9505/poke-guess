import React, { Fragment, memo } from "react";

//images
//images
import pokeball from "../assets/images/pokeball.png";
import greatball from "../assets/images/great-ball.png";
import masterball from "../assets/images/master-ball.png";
import ultraball from "../assets/images/ultra-ball.png";

const Guess = memo((props) => {
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-tems-center">
        {props.guessGeneration === props.pokeGeneration ? (
          <img
            src={masterball}
            alt="correct"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : props.guessGeneration > props.pokeGeneration ? (
          <img
            src={ultraball}
            alt="guessed_too_high"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : (
          <img
            src={greatball}
            alt="guess_too_low"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        )}
        {props.guessType1 === props.pokeType1 ? (
          <img
            src={masterball}
            alt="correct_guess"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : (
          <img
            src={pokeball}
            alt="unmaatched"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        )}
        {props.guessType2 === props.pokeType2 ? (
          <img
            src={masterball}
            alt="correct_guess"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : (
          <img
            src={pokeball}
            alt="unmaatched"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        )}
        {props.guess.weight === props.pokemon.weight ? (
          <img
            src={masterball}
            alt="correct_guess"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : props.guess.weight > props.pokemon.weight ? (
          <img
            src={ultraball}
            alt="guess_is_higher"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : (
          <img
            src={greatball}
            alt="guess_is_lower"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        )}
        {props.guess.height === props.pokemon.height ? (
          <img
            src={masterball}
            alt="correct_guess"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : props.guess.height > props.pokemon.height ? (
          <img
            src={ultraball}
            alt="guess_is_higher"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        ) : (
          <img
            src={greatball}
            alt="guess_is_lower"
            className="img-fluid pokeball ms-3 me-4 align-self-center"
          />
        )}
        {/* <p className="ms-3">{props.guess.species.name}</p>
        <img src={props.guess.sprites.front_default} /> */}
      </div>
    </Fragment>
  );
});

Guess.displayName = "Guess";
export default Guess;
