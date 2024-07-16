// src/pages/pokedex/Pokedex.js
import React, { useEffect, useState } from "react";
import PokedexCard from "./PokedexCard";
import PokemonDetail from "./PokemonDetail";
import "./Pokedex.css";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await response.json();
      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const pokemonData = await res.json();
          const speciesRes = await fetch(pokemonData.species.url);
          const speciesData = await speciesRes.json();
          const koreanName = speciesData.names.find(
            (name) => name.language.name === "ko"
          );
          return {
            ...pokemonData,
            koreanName: koreanName ? koreanName.name : pokemonData.name,
          };
        })
      );
      setPokemonList(detailedPokemonList);
    };
    fetchPokemonList();
  }, []);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokedex">
      <h1>Pokémon Pokédex</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokedexCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={handleCardClick}
          />
        ))}
      </div>
      {selectedPokemon && (
        <PokemonDetail pokemon={selectedPokemon} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Pokedex;
