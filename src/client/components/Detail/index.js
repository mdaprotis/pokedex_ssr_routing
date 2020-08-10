import React, { useState, useEffect, useContext } from "react";
import { selectPokemon } from "../../utils/utils.js";
import NavButtons from "./NavButtons";
import DetailPanel from "./DetailPanel";
import { StateContext } from "../../context/StateContext";
import { useHistory } from "react-router-dom";
import "./style.css";

const Detail = () => {
  const [show, setShow] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const { state, setState } = useContext(StateContext);
  const history = useHistory();

  const MAX_POKEMONS = 964;

  const handlePrev = () => {
    let id = parseInt(window._current_url.split("/").pop());
    if (state.selected_pokemon.id - 1 <= id * 20 && (id - 1) * 20 >= 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem("last_page", window._current_url);
      }
      history.push(`/${id - 1}`);
    }
    if (state.selected_pokemon.id - 1 > 0)
      selectPokemon(state.prev, state, setState);
  };

  const handleNext = () => {
    let id = parseInt(window._current_url.split("/").pop());
    if (
      state.selected_pokemon.id + 1 > (id + 1) * 20 &&
      (id + 1) * 20 < MAX_POKEMONS
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem("last_page", window._current_url);
      }
      history.push(`/${id + 1}`);
    }
    if (state.selected_pokemon.id + 1 <= MAX_POKEMONS)
      selectPokemon(state.next, state, setState);
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (state.selected_pokemon !== undefined) {
      setShow(true);
      setPokemon(state.selected_pokemon);
    }
  }, [state]);

  return (
    <>
      {show && pokemon != null ? (
        <div
          className={`wrapper ${
            show && pokemon !== null ? "slide-in-bottom" : ""
          }`}
        >
          <div className="detail_container">
            <NavButtons
              next={handleNext}
              prev={handlePrev}
              close={handleClose}
            />
            <DetailPanel pokemon={pokemon} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Detail;
