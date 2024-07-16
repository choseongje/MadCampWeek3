// src/components/PokemonDetail.js
import React from "react";
import "./PokemonDetail.css";

const PokemonDetail = ({ pokemon, onClose }) => {
  const types = pokemon.types
    ? pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")
    : "Unknown";

  return (
    <div className="pokemon-detail">
      <button onClick={onClose}>Close</button>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.koreanName}</h2>
      <p>Type: {types}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {/* 추가적인 포켓몬 상세 정보 */}
    </div>
  );
};

export default PokemonDetail;
