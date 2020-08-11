import React, { createContext, useState } from "react";

export const StateContext = createContext();
const MAX_POKEMONS = 964;

const initialState = () => {
  let initial_state = {};
  if (typeof window !== "undefined" && localStorage.getItem("last_page")) {
    if (window._current_url > localStorage.getItem("last_page")) {
      let pokemon = window._pokeList[Object.keys(window._pokeList)[0]];
      let prev = pokemon.id > 0 ? pokemon.id - 1 : null;
      let next = pokemon.id < MAX_POKEMONS ? pokemon.id + 1 : null;
      initial_state = { selected_pokemon: pokemon, prev, next };
    } else if (window._current_url < localStorage.getItem("last_page")) {
      let pokemon = window._pokeList[Object.keys(window._pokeList).length];
      let prev = pokemon.id > 0 ? pokemon.id - 1 : null;
      let next = pokemon.id < MAX_POKEMONS ? pokemon.id + 1 : null;
      initial_state = { selected_pokemon: pokemon, prev, next };
    }
  }
  return initial_state;
};

const StateContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const updateState = (new_props = []) => {
    new_props = new_props instanceof Array ? new_props : [new_props];
    new_props.forEach((prop) => {
      setState({ ...state, [prop.name]: prop.value });
    });
  };

  return (
    <StateContext.Provider value={{ state, updateState, setState }}>
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
