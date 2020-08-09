import React, { useState, useContext } from "react";
import { StateContext } from "../../context/StateContext";
import { selectPokemon } from "../../utils/utils.js";
import "./style.css";

const Card = ({ pokemon }) => {
  const { state, setState } = useContext(StateContext);

  const handleClick = (e) => {
    selectPokemon(pokemon.id, state, setState);
  };

  return (
    <div className="Card" onClick={handleClick}>
      <div className="Card_img_container">
        <img className="Card_img" src={pokemon.image} alt="" />
      </div>
      <h4 className="Card_name">{pokemon.name}</h4>
      <div className="Card_info">{`#${String(pokemon.id).padStart(4, 0)}`}</div>
    </div>
  );
};

export default Card;
