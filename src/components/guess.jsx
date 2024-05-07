import React, { Fragment, memo, useEffect, useState } from "react";

//images
//images
import pokeball from "../assets/images/pokeball.png";
import greatball from "../assets/images/great-ball.png";
import masterball from "../assets/images/master-ball.png";
import ultraball from "../assets/images/ultra-ball.png";

const Guess = memo((props) => {
  const [guessGeneration, setGuessGeneration] = useState(null);
  const [guess, setGuess] = useState(null);
  const [guessType1, setGuessType1] = useState("");
  const [guessType2, setGuessType2] = useState("none");

  const guessedPokemon = async () => {
    try {
      const guessedData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.value}`
      );
      if (guessedData.ok) {
        const guessDataResult = await guessedData.json();
        setGuess(guessDataResult);

        //storing types of guessed pokemon
        setGuessType1(guessDataResult.types[0].type.name);
        if (guessDataResult.types.length > 1) {
          setGuessType2(guessDataResult.types[1].type.name);
        }
      } else {
        console.error("something went wrong!!!!");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
    const guessGen = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${props.value}`
    );
    if (guessGen.ok) {
      const guessGenResult = await guessGen.json();
      setGuessGeneration(guessGenResult.generation.name);
      //for hinting type
      // if (guess !== null) {
      //   if (pokeType1 === guessType1 || pokeType2 === guessType1) {
      //     if (pokeType1 === guessType2 || pokeType2 === guessType2) {
      //       setMatch([...match, guessType2]);
      //     } else {
      //       setUnmatch([...unmatch, guessType2]);
      //       setMatch([...match, guessType1]);
      //     }
      //   } else if (pokeType1 === guessType2 || pokeType2 === guessType2) {
      //     setMatch([...match, guessType2]);
      //     setUnmatch([...unmatch, guessType1]);
      //   } else {
      //     setUnmatch([...unmatch, guessType1, guessType2]);
      //   }
      // }
    } else {
      console.error("something went wrongssada!!!!");
    }

    // setVisible(true);
    // setShowTypeComponent(true);
  };

  useEffect(() => {
    guessedPokemon();
  }, []);

  return (
    <Fragment>
      {guess !== null ? (
        <div className="d-flex justify-content-center align-tems-center">
          {guessGeneration === props.pokeGeneration ? (
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball ms-3 me-4 align-self-center"
            />
          ) : guessGeneration > props.pokeGeneration ? (
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
          {guessType1 === props.pokeType1 ? (
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
          {guessType2 === props.pokeType2 ? (
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
          {guess.weight === props.pokemon.weight ? (
            <img
              src={masterball}
              alt="correct_guess"
              className="img-fluid pokeball ms-3 me-4 align-self-center"
            />
          ) : guess.weight > props.pokemon.weight ? (
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
          {guess.height === props.pokemon.height ? (
            <img
              src={masterball}
              alt="correct_guess"
              className="img-fluid pokeball ms-3 me-4 align-self-center"
            />
          ) : guess.height > props.pokemon.height ? (
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
      ) : (
        ""
      )}
    </Fragment>
  );
});

Guess.displayName = "Guess";
export default Guess;
