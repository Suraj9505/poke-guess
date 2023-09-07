import React, { Fragment, memo } from "react";

import logo from "../images/logo-full.png";

const Home = memo(() => {
  return (
    <Fragment>
      <div className="container">
        <div className="logo d-flex justify-content-center">
          <img src={logo} alt="pokemon_logo" />
        </div>
      </div>
    </Fragment>
  );
});

Home.displayName = "Home";
export default Home;
