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

  const handlePrev = () => {
    let id = parseInt(history.location.pathname.split("/").pop());
    if (state.prev === null && (id - 1) * 20 >= 0) {
      history.push(`/${id - 1}`);
    }
    selectPokemon(state.prev, state, setState);
  };

  const handleNext = () => {
    let id = parseInt(history.location.pathname.split("/").pop());
    if (state.next === null && (id + 1) * 20 < 964) {
      history.push(`/${id + 1}`);
    }
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
