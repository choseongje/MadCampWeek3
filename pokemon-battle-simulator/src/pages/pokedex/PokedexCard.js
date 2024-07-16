// src/components/PokedexCard.js
import React from "react";
import "./PokedexCard.css";

const PokedexCard = ({ pokemon, onClick }) => {
  const formatNumber = (number) => {
    return number.toString().padStart(3, "0");
  };

  return (
    <div className="pokedex-card" onClick={() => onClick(pokemon)}>
      <div className="pokemon-id">{formatNumber(pokemon.id)}</div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.koreanName}</h3>
    </div>
  );
};

export default PokedexCard;
