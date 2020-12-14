import React from "react";

import "./App.css";
import ConfiguratorContainer from "./components/ConfiguratorContainer/ConfiguratorContainer";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <>
      <Nav />
      <ConfiguratorContainer></ConfiguratorContainer>
    </>
  );
}

export default App;
