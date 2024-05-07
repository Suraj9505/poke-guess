import React, { Fragment, memo, useState, useEffect } from "react";

//react-bootstrap
import { Button } from "react-bootstrap";

const TypeComponent = memo((props) => {
  const [type, setType] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeData = await fetch(`https://pokeapi.co/api/v2/type/`);
        if (typeData.ok) {
          const typeDataResult = await typeData.json();
          setType(typeDataResult);
          setVisible(true);
        } else {
          console.error("Something went Wrong!!!!");
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    fetchData();
  }, [props]);

  // if (type !== null) {
  //   console.log(type.name);
  // }

  return (
    <Fragment>
      {type !== null && visible ? (
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-wrap justify-content-center m-5 w-50 types">
            {type.results.slice(0, 18).map((item, index) => {
              const isMatched = props.matched.includes(item.name);
              const isDiabled = props.unmatch.includes(item.name);
              return (
                <Button
                  size="sm"
                  className={`text-capitalize m-2 ${item.name} ${
                    isMatched ? "matched" : ""
                  }`}
                  key={index}
                  disabled={isDiabled}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
});

TypeComponent.displayName = "TypeComponent";
export default TypeComponent;
