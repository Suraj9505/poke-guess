import { Fragment } from "react";
// import CustomScrollbar from "./assets/components/scrollbar/custom-scrollbar";
// import "./App.css";

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
