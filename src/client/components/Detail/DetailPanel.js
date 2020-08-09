import React from "react";
import { typeColors } from "../../utils/utils.js";

const DetailPanel = ({ pokemon }) => {
  const PokemonImage = () => (
    <div>
      <img className="image" src={pokemon.artwork} alt="" />
    </div>
  );

  const Name = () => (
    <div>
      <h2 className="poke_name">
        {`${pokemon.name} #${String(pokemon.id).padStart(4, 0)}`}
      </h2>
    </div>
  );

  const Weight = () => (
    <div className="poke_data">
      <p className="title">Weight</p>
      <p>{`${pokemon.weight / 10} Kg`}</p>
    </div>
  );

  const Height = () => (
    <div className="poke_data">
      <p className="title">Height</p>
      <p>{`${pokemon.height / 10} m`}</p>
    </div>
  );

  const Abilities = () => (
    <div className="poke_data">
      <p className="title">Ability</p>
      <p>{pokemon.abilities[0].ability.name}</p>
    </div>
  );

  const Types = () => (
    <div className="poke_data">
      <div className="title">Type</div>
      <div className="poke_types">
        {pokemon.types.map((type, i) => {
          return (
            <div
              className="poke_type"
              key={`dtl_${i}`}
              style={{
                backgroundColor: typeColors[type.type.name],
              }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="grid_container">
      <PokemonImage />
      <div className="data_container">
        <Name />
        <div className="data">
          <Weight />
          <Types />
          <Height />
          <Abilities />
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
