import React, { createContext, useState } from "react";

export const StateContext = createContext();

const StateContextProvider = (props) => {
  const [state, setState] = useState({});

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
