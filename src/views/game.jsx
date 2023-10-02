import React, { memo, Fragment, useState, useEffect, useRef } from "react";

//react-bootstrap
import { Button, InputGroup } from "react-bootstrap";

//images
import TypeComponent from "../components/type-component";
import Guess from "./guess";

const Game = memo(() => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeGeneration, setPokeGeneration] = useState(null);
  const [guessGeneration, setGuessGeneration] = useState(null);
  const [guess, setGuess] = useState(null);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [totalGuess, setTotalGuess] = useState(7);
  const [value, setValue] = useState("");

  let index = useRef(Math.floor(Math.random() * 1017 + 1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokeData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${index.current}`
        );
        const pokeGen = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${index.current}`
        );
        if (pokeGen.ok) {
          const pokeGenResult = await pokeGen.json();
          setPokeGeneration(pokeGenResult.generation.name);
        } else {
          console.error("something went wrong!!!!");
        }
        if (pokeData.ok) {
          const pokeDataResult = await pokeData.json();
          setPokemon(pokeDataResult);
        } else {
          console.error("Something went Wrong!!!!");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const guessedPokemon = async () => {
    try {
      const guessedData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}`
      );
      if (guessedData.ok) {
        const guessDataResult = await guessedData.json();
        setGuess(guessDataResult);
      } else {
        setError("This is not a Pokemon!!");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
    const guessGen = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    if (guessGen.ok) {
      const guessGenResult = await guessGen.json();
      setGuessGeneration(guessGenResult.generation.name);
    } else {
      console.error("something went wrongssada!!!!");
    }

    setVisible(true);
  };

  console.log("hi", pokeGeneration);

  const inputChange = (event) => {
    setValue(event.target.value);
    setError("");
  };

  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-center">
        <h5 className="align-self-center mt-5 ">
          I am thinking of a pokemon, can you guess that pokemon?
        </h5>
        <br />
        {totalGuess > 1 ? (
          <p className="align-self-center">
            You have {totalGuess} guesses left
          </p>
        ) : (
          <p className="align-self-center">You have {totalGuess} guess left</p>
        )}
        {visible && (
          <Guess
            pokemon={pokemon}
            guess={guess}
            pokeGeneration={pokeGeneration}
            guessGeneration={guessGeneration}
          />
        )}
        <div className="d-flex justify-content-center mt-5">
          <InputGroup className="w-50">
            <input
              className="form-control text-white"
              placeholder="make your guess"
              value={value}
              onChange={inputChange}
            />
          </InputGroup>
          <Button variant="secondary" onClick={guessedPokemon}>
            Submit
          </Button>
        </div>
        <p className="text-danger">{error}</p>

        <TypeComponent />
      </div>
    </Fragment>
  );
});

Game.displayName = "Game";

export default Game;
