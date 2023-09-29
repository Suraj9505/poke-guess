import { Fragment } from "react";

function App({ children }) {
  return (
    <Fragment>
      {/* <CustomScrollbar> */}

      <div className="App">{children}</div>

      {/* </CustomScrollbar> */}
    </Fragment>
  );
}

export default App;
