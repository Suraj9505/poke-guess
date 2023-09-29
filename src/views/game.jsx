import React, { memo, Fragment, useState, useEffect, useRef } from "react";

//react-bootstrap
import { Button, InputGroup } from "react-bootstrap";

//images
import logo from "../assets/images/logo-full.png";
import TypeComponent from "../components/type-component";

const Game = memo(() => {
  const [pokemon, setPokemon] = useState(null);
  let index = useRef(Math.floor(Math.random() * 1017 + 1));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokeData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${index.current}`
        );
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

  return (
    <Fragment>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center mt-5">
          <InputGroup className="w-50">
            <input
              className="form-control text-white"
              placeholder="make your guess"
            />
          </InputGroup>
          <Button variant="secondary">Submit</Button>
        </div>

        <TypeComponent />
      </div>
    </Fragment>
  );
});

Game.displayName = "Game";

export default Game;
