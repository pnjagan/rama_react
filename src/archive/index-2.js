import React from "react";
import { render } from "react-dom";
import OTDemo from "./OTDemo";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <OTDemo />
  </div>
);

render(<App />, document.getElementById("root"));
