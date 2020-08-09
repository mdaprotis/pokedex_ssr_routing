import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";

const main = (
  <BrowserRouter forceRefresh={true}>
    <Main pokeList={window._pokeList} />
  </BrowserRouter>
);

ReactDom.hydrate(main, document.getElementById("root"));
