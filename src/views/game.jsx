import React, { memo, Fragment, useState, useEffect, useRef } from "react";

//react-bootstrap
import { Button, InputGroup } from "react-bootstrap";

//images
import TypeComponent from "../components/type-component";
import Guess from "../components/guess";

const Game = memo(() => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeGeneration, setPokeGeneration] = useState(null);
  const [guessGeneration, setGuessGeneration] = useState(null);
  const [guess, setGuess] = useState(null);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [pokeType1, setPokeType1] = useState("");
  const [pokeType2, setPokeType2] = useState("none");
  const [guessType1, setGuessType1] = useState("");
  const [guessType2, setGuessType2] = useState("none");
  const [all, setAll] = useState([]);
  const [attempts, setAttempts] = useState(7);
  const [match, setMatch] = useState([]);
  const [unmatch, setUnmatch] = useState([]);
  const [showTypeComponent, setShowTypeComponent] = useState(true);

  console.log("match", match);
  console.log("unmatch", unmatch);

  let index = useRef(Math.floor(Math.random() * 1017 + 1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allNames = [];
        let url = "https://pokeapi.co/api/v2/pokemon/";

        const pokeData = await fetch(`${url}${index.current}`);

        if (pokeData.ok) {
          const pokeDataResult = await pokeData.json();
          setPokemon(pokeDataResult);

          //storing types
          setPokeType1(pokeDataResult.types[0].type.name);
          if (pokeDataResult.types.length > 1) {
            setPokeType2(pokeDataResult.types[1].type.name);
          }
        } else {
          console.error("Something went Wrong!!!!");
        }
        //first api call end

        // second api call start
        const pokeGen = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${index.current}`
        );
        if (pokeGen.ok) {
          const pokeGenResult = await pokeGen.json();
          setPokeGeneration(pokeGenResult.generation.name);
        } else {
          console.error("something went wrong!!!!");
        }
        //second api call end

        //third api call start
        while (url) {
          const allPokemon = await fetch(`${url}`);
          if (allPokemon.ok) {
            const result = await allPokemon.json();
            const names = result.results.map((pokemon) => pokemon.name);
            allNames = [...allNames, ...names];
            url = result.next;
          } else {
            console.error("Something went wrong");
            break;
          }
        }
        setAll(allNames);
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //calling api to get the data for guessed pokemon
  const guessedPokemon = async () => {
    try {
      const guessedData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}`
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
      `https://pokeapi.co/api/v2/pokemon-species/${value}`
    );
    if (guessGen.ok) {
      const guessGenResult = await guessGen.json();
      setGuessGeneration(guessGenResult.generation.name);
      //for hinting type
      if (guess !== null) {
        if (pokeType1 === guessType1 || pokeType2 === guessType1) {
          if (pokeType1 === guessType2 || pokeType2 === guessType2) {
            setMatch([...match, guessType2]);
          } else {
            setUnmatch([...unmatch, guessType2]);
            setMatch([...match, guessType1]);
          }
        } else if (pokeType1 === guessType2 || pokeType2 === guessType2) {
          setMatch([...match, guessType2]);
          setUnmatch([...unmatch, guessType1]);
        } else {
          setUnmatch([...unmatch, guessType1, guessType2]);
        }
      }
    } else {
      console.error("something went wrongssada!!!!");
    }

    setVisible(true);
    setShowTypeComponent(true);
  };

  //taking input and setting the value
  const inputChange = (event) => {
    setValue(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (all.includes(value)) {
      guessedPokemon();
      setAttempts(attempts - 1);
    } else {
      setError("This is not a pokemon!!!");
    }
  };

  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-center">
        <h5 className="align-self-center mt-5 ">
          I am thinking of a pokemon, can you guess that pokemon?
        </h5>
        <br />
        {attempts > 1 ? (
          <p className="align-self-center">You have {attempts} guesses left</p>
        ) : (
          <p className="align-self-center">You have {attempts} guess left</p>
        )}
        {visible && (
          <div className="d-flex flex-column w-100 justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <p className="text-capitalize m-3 align-self-center">gen</p>
              <p className="text-capitalize m-3 align-self-center">type 1</p>
              <p className="text-capitalize m-3 align-self-center">type 2</p>
              <p className="text-capitalize m-3 align-self-center">weight</p>
              <p className="text-capitalize m-3 align-self-center">height</p>
            </div>
            <div className="mb-3">
              <Guess
                pokemon={pokemon}
                guess={guess}
                pokeGeneration={pokeGeneration}
                guessGeneration={guessGeneration}
                pokeType1={pokeType1}
                pokeType2={pokeType2}
                guessType1={guessType1}
                guessType2={guessType2}
              />
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center mt-5"
        >
          <InputGroup className="w-50">
            <input
              className="form-control text-white"
              placeholder="make your guess"
              value={value}
              onChange={inputChange}
            />
          </InputGroup>
          <Button type="submit" variant="secondary">
            Submit
          </Button>
        </form>
        <p className="text-danger align-self-center mt-3">{error}</p>

        {showTypeComponent && (
          <TypeComponent
            matched={match}
            unmatch={unmatch}
            types={[pokeType1, pokeType2]}
          />
        )}
      </div>
    </Fragment>
  );
});

Game.displayName = "Game";

export default Game;
