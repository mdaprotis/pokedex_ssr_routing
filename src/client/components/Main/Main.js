import React, { useState } from "react";
import { createMemoryHistory } from "history";
import StateContextProvider from "../../context/StateContext";
import Detail from "../Detail";
import Card from "../Card";
import Header from "../Header";
import "./style.css";

const Main = ({ pokeList }) => {
  const PokeList = () => (
    <div className="grid-container">
      {Object.keys(pokeList).map((key) => {
        const pokemon = pokeList[key];
        return <Card key={`pkm_${pokemon.id}`} pokemon={pokemon} />;
      })}
    </div>
  );

  return (
    <StateContextProvider>
      <Header />
      <PokeList />
      <Detail />
    </StateContextProvider>
  );
};

export default Main;
