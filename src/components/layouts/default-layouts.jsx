import React, { memo, Fragment, Suspense } from "react";

// reacr-router
import { Outlet } from "react-router-dom";

//img
import logo from "../../assets/images/logo-full.png";

const DefaultLayouts = memo(() => {
  return (
    <Fragment>
      {
        <Suspense fallback={<div className="react-load"></div>}>
          <div className="container mb-5">
            <div className="main-content">
              <div className="logo d-flex justify-content-center">
                <img src={logo} alt="pokemon_logo" className="img-fluid" />
              </div>
            </div>
            <Outlet></Outlet>
          </div>
        </Suspense>
      }
    </Fragment>
  );
});

DefaultLayouts.displayName = "DefaultLayouts";
export default DefaultLayouts;
