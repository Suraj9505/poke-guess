import React, { Fragment, memo, useState, useEffect } from "react";

//react-bootstrap
import { Button } from "react-bootstrap";

const TypeComponent = memo(() => {
  const [type, setType] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeData = await fetch(`https://pokeapi.co/api/v2/type/`);
        if (typeData.ok) {
          const typeDataResult = await typeData.json();
          setType(typeDataResult);
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
      {type !== null ? (
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-wrap justify-content-center m-5 w-50 types">
            {type.results.slice(0, 18).map((item, index) => {
              return (
                <Button
                  size="sm"
                  className={`text-capitalize m-2 ${item.name}`}
                  key={index}
                  disabled={disabled}
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
