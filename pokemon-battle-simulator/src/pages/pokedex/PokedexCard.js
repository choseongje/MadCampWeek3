// src/components/PokedexCard.js
import React from "react";
import "./PokedexCard.css";

const PokedexCard = ({ pokemon, onClick }) => {
  const types = pokemon.types
    ? pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")
    : "Unknown";

  return (
    <div className="pokedex-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.koreanName}</h3>
      <p>{types}</p>
    </div>
  );
};

export default PokedexCard;
