import { Fragment } from "react";
// import "./App.css";

function App({ children }) {
  return (
    <Fragment>
      <div className="App">{children}</div>
    </Fragment>
  );
}

export default App;
