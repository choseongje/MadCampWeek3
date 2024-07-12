import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, getTypeIconUrl, getTypeNameInKorean }) => (
  <div className="pokemon-card">
    <h2>{pokemon.koreanName}</h2>
    <img src={pokemon.sprites.front_default} alt={pokemon.koreanName} />
    <p>
      {pokemon.types.map((typeInfo) => (
        <span
          key={typeInfo.type.name}
          style={{ display: "inline-block", marginRight: "8px" }}
        >
          <img
            src={getTypeIconUrl(typeInfo.type.name)}
            alt={typeInfo.type.name}
            className="type-icon"
          />
          {getTypeNameInKorean(typeInfo.type.name)}
        </span>
      ))}
    </p>
  </div>
);

export default PokemonCard;
