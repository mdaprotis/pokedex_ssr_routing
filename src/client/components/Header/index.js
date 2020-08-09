import React, { useState, useContext } from "react";
import "./style.css";
import { StateContext } from "../../context/StateContext";
import { selectPokemon, searchPokemon } from "../../utils/utils.js";

const Header = () => {
  const [search_value, setSearchValue] = useState("");
  const { state, setState } = useContext(StateContext);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const pokemon = searchPokemon(e.target.value);
    if (pokemon && Object.keys(pokemon)) {
      selectPokemon(pokemon.id, state, setState);
    }
  };

  return (
    <div className="header">
      <div>
        <input
          className="search"
          type="text"
          size="15"
          value={search_value}
          onClick={() => {
            setSearchValue("");
          }}
          onChange={handleChange}
          placeholder="Search..."
        ></input>
        <i className="fa fa-search"></i>
      </div>
    </div>
  );
};

export default Header;
