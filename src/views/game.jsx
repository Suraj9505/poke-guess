import React, { memo, Fragment, useState, useEffect, useRef } from "react";

//react-bootstrap
import { Button, Col, InputGroup, Row } from "react-bootstrap";

//images
import TypeComponent from "../components/type-component";
import Guess from "../components/guess";

const Game = memo(() => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeGeneration, setPokeGeneration] = useState(null);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [pokeType1, setPokeType1] = useState("");
  const [pokeType2, setPokeType2] = useState("none");
  const [all, setAll] = useState([]);
  const [attempts, setAttempts] = useState(7);
  const [match, setMatch] = useState([]);
  const [unmatch, setUnmatch] = useState([]);
  const [guessedValues, setGuessedValues] = useState([]);
  const [showTypeComponent, setShowTypeComponent] = useState(true);

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

  //taking input and setting the value
  const inputChange = (event) => {
    setValue(event.target.value);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (all.includes(value)) {
      setAttempts(attempts - 1);
      setVisible(true);
      setFinalValue(value);
      setGuessedValues((prevGuessedValues) => [...prevGuessedValues, value]);
    } else {
      setError("This is not a pokemon!!!");
    }
  };

  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5 className="align-self-center mt-5 ">
          I am thinking of a pokemon, can you guess that pokemon?
        </h5>
        <br />
        {attempts > 1 ? (
          <p className="align-self-center">You have {attempts} guesses left</p>
        ) : (
          <p className="align-self-center">You have {attempts} guess left</p>
        )}
        {guessedValues.length !== 0 ? (
          <div className="d-flex flex-column w-50 justify-content-center">
            <Row className="justify-content-center my-4">
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                gen
              </Col>
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                type 1
              </Col>
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                type 2
              </Col>
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                weight
              </Col>
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                height
              </Col>
              <Col
                as="p"
                className="text-capitalize text-center align-self-center col-2 mb-0"
              >
                guess
              </Col>
            </Row>
            {guessedValues.map((item, index) => {
              return (
                <div className="mb-3" key={index}>
                  <Guess
                    pokemon={pokemon}
                    value={item}
                    pokeGeneration={pokeGeneration}
                    pokeType1={pokeType1}
                    pokeType2={pokeType2}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <form
          onSubmit={handleSubmit}
          className="d-flex justify-content-center mt-5 w-50"
        >
          <InputGroup className="w-75">
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
