import React, { memo, Fragment, Suspense } from "react";

// reacr-router
import { Outlet } from "react-router-dom";

const DefaultLayouts = memo(() => {
  return (
    <Fragment>
      {
        <Suspense fallback={<div className="react-load"></div>}>
          <Outlet></Outlet>
        </Suspense>
      }
    </Fragment>
  );
});

DefaultLayouts.displayName = "DefaultLayouts";
export default DefaultLayouts;
