export const typeColors = {
  bug: "#729f3f",
  dragon: "#53a4cf",
  fairy: "#fdb9e9",
  fire: "#fd7d24",
  ghost: "#D7D7D7",
  ground: "#7B6200",
  normal: "#a4acaf",
  pyschic: "#f366b9",
  steel: "#9eb7b",
  dark: "#707070",
  electric: "#eed535",
  fighting: "#d56723",
  flying: "#3dc7ef",
  grass: "#9bcc50",
  ice: "#51c4e7",
  poison: "#b97fc9",
  rock: "#a38c21",
  water: "#4592c4",
};

export const selectPokemon = (id, state, setState) => {
  const selected = window._indexedPokeList[id];
  const next = window._indexedPokeList[id + 1] ? id + 1 : null;
  const prev = window._indexedPokeList[id - 1] ? id - 1 : null;
  setState({ ...state, selected_pokemon: selected, next, prev });
};

export const searchPokemon = (name) => {
  const pokemon = window._pokeList.filter(
    (el) => el && el.name.toUpperCase() === name.trim().toUpperCase()
  );
  return pokemon.length ? pokemon[0] : null;
};
