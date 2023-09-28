import React, { memo, Fragment, useState, useEffect } from "react";

//images
import logo from "../assets/images/logo-full.png";

const Game = memo(() => {
  const [pokemon, setPokemon] = useState(null);
  let index = Math.floor(Math.random() * 1017 + 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${index}`
        );
        if (response.ok) {
          const data = await response.json();
          setPokemon(data);
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
      <div className="container mb-5">
        <div className="main-content">
          <div className="logo d-flex justify-content-center">
            <img src={logo} alt="pokemon_logo" />
          </div>
          {pokemon !== null ? (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <img
                src={pokemon.sprites.front_default}
                className="w-25 h-25 d-flex justify-content-center"
              />
              <h3 className="text-capitalize">{pokemon.species.name}</h3>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
});

Game.displayName = "Game";

export default Game;
