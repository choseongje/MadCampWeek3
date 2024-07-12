// src/pages/SelectedPokemon.js
import React from "react";
import { useLocation } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import typeMapping from "../data/typeMapping";

const SelectedPokemon = () => {
  const location = useLocation();
  const { selectedPokemon } = location.state || { selectedPokemon: [] };

  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  return (
    <div className="App">
      <h1>선택된 포켓몬</h1>
      <div className="pokemon-container">
        {selectedPokemon.length > 0 ? (
          selectedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              getTypeIconUrl={getTypeIconUrl}
              getTypeNameInKorean={getTypeNameInKorean}
            />
          ))
        ) : (
          <p>선택된 포켓몬이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SelectedPokemon;
