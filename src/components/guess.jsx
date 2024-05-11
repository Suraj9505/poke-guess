import React, { Fragment, memo, useEffect, useState } from "react";

//images
//images
import pokeball from "../assets/images/pokeball.png";
import greatball from "../assets/images/great-ball.png";
import masterball from "../assets/images/master-ball.png";
import ultraball from "../assets/images/ultra-ball.png";
import {
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
  Modal,
  CloseButton,
} from "react-bootstrap";

const Guess = memo((props) => {
  const [guessGeneration, setGuessGeneration] = useState(null);
  const [guess, setGuess] = useState(null);
  const [guessType1, setGuessType1] = useState("");
  const [guessType2, setGuessType2] = useState("none");
  const [gameOver, setGameOver] = useState(false);

  console.log(props.modal);
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
      {guess !== null && !gameOver ? (
        <Fragment>
          <Row className="justify-content-center align-items-center">
            {guessGeneration === props.pokeGeneration ? (
              <Col className="col-2 text-center">
                <img
                  src={masterball}
                  alt="correct"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : guessGeneration > props.pokeGeneration ? (
              <Col className="col-2 text-center">
                <img
                  src={ultraball}
                  alt="guessed_too_high"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : (
              <Col className="col-2 text-center">
                <img
                  src={greatball}
                  alt="guess_too_low"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            )}
            {guessType1 === props.pokeType1 ? (
              <Col className="col-2 text-center">
                <img
                  src={masterball}
                  alt="correct_guess"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : (
              <Col className="col-2 text-center">
                <img
                  src={pokeball}
                  alt="unmaatched"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            )}
            {guessType2 === props.pokeType2 ? (
              <Col className="col-2 text-center">
                <img
                  src={masterball}
                  alt="correct_guess"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : (
              <Col className="col-2 text-center">
                <img
                  src={pokeball}
                  alt="unmaatched"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            )}
            {guess.weight === props.pokemon.weight ? (
              <Col className="col-2 text-center">
                <img
                  src={masterball}
                  alt="correct_guess"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : guess.weight > props.pokemon.weight ? (
              <Col className="col-2 text-center">
                <img
                  src={ultraball}
                  alt="guess_is_higher"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : (
              <Col className="col-2 text-center">
                <img
                  src={greatball}
                  alt="guess_is_lower"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            )}
            {guess.height === props.pokemon.height ? (
              <Col className="col-2 text-center">
                <img
                  src={masterball}
                  alt="correct_guess"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : guess.height > props.pokemon.height ? (
              <Col className="col-2 text-center">
                <img
                  src={ultraball}
                  alt="guess_is_higher"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            ) : (
              <Col className="col-2 text-center">
                <img
                  src={greatball}
                  alt="guess_is_lower"
                  className="img-fluid pokeball align-self-center"
                />
              </Col>
            )}
            <Col className="col-2 text-center">
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip>
                    {guessGeneration ? (
                      <Fragment>
                        <div className="text-white text-capitalize mb-2">
                          Gen :{" "}
                          <span className="text-uppercase">
                            {guessGeneration.replace("generation-", " ")}
                          </span>
                        </div>
                        <div className="text-white text-capitalize mb-2">
                          type 1 : <span> {guessType1}</span>
                        </div>
                        <div className="text-white text-capitalize mb-2">
                          type 2 : <span> {guessType2}</span>
                        </div>
                        <div className="text-white text-capitalize mb-2">
                          weight :{" "}
                          <span className="text-lowercase">
                            {" "}
                            {guess.weight / 10} kg
                          </span>
                        </div>
                        <div className="text-white text-capitalize mb-2">
                          height :{" "}
                          <span className="text-lowercase">
                            {" "}
                            {(guess.height * 10) / 100} m
                          </span>
                        </div>
                      </Fragment>
                    ) : (
                      ""
                    )}
                  </Tooltip>
                }
              >
                <img
                  src={guess.sprites.front_default}
                  className="img-fluid avatar-50"
                />
              </OverlayTrigger>
            </Col>
          </Row>
          {/* <div className="border-bottom border-1"></div> */}
        </Fragment>
      ) : guess !== null && gameOver ? (
        <Fragment>
          <Col className="col-2 text-center">
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball align-self-center"
            />
          </Col>
          <Col className="col-2 text-center">
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball align-self-center"
            />
          </Col>
          <Col className="col-2 text-center">
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball align-self-center"
            />
          </Col>
          <Col className="col-2 text-center">
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball align-self-center"
            />
          </Col>
          <Col className="col-2 text-center">
            <img
              src={masterball}
              alt="correct"
              className="img-fluid pokeball align-self-center"
            />
          </Col>
          <Col className="col-2 text-center">
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>
                  {guessGeneration ? (
                    <Fragment>
                      <div className="text-white text-capitalize mb-2">
                        Gen :{" "}
                        <span className="text-uppercase">
                          {guessGeneration.replace("generation-", " ")}
                        </span>
                      </div>
                      <div className="text-white text-capitalize mb-2">
                        type 1 : <span> {guessType1}</span>
                      </div>
                      <div className="text-white text-capitalize mb-2">
                        type 2 : <span> {guessType2}</span>
                      </div>
                      <div className="text-white text-capitalize mb-2">
                        weight :{" "}
                        <span className="text-lowercase">
                          {" "}
                          {guess.weight / 10} kg
                        </span>
                      </div>
                      <div className="text-white text-capitalize mb-2">
                        height :{" "}
                        <span className="text-lowercase">
                          {" "}
                          {(guess.height * 10) / 100} m
                        </span>
                      </div>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </Tooltip>
              }
            >
              <img
                src={guess.sprites.front_default}
                className="img-fluid avatar-50"
              />
            </OverlayTrigger>
          </Col>
        </Fragment>
      ) : (
        ""
      )}

      <Modal show={props.modal} onHide={props.handleModal}>
        <Modal.Body>
          <CloseButton onClick={props.handleModal} variant="white" />
          <img src={`${props.pokemon.sprites.front_default}`} alt="hello" />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
});

Guess.displayName = "Guess";
export default Guess;
