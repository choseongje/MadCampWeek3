// src/components/PokemonDetail.js
import React, { useEffect, useState, useRef } from "react";
import "./PokemonDetail.css";
import typeMapping from "../../data/typeMapping";

const PokemonDetail = ({ pokemon, onClose }) => {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [baseStats, setBaseStats] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(pokemon);
  const detailRef = useRef();

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      const speciesResponse = await fetch(selectedPokemon.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();
      const chain = [];
      let current = evolutionData.chain;
      do {
        const res = await fetch(current.species.url);
        const data = await res.json();
        const koreanName = data.names.find(
          (name) => name.language.name === "ko"
        ).name;
        const pokemonId = current.species.url.split("/").filter(Boolean).pop();
        chain.push({
          id: pokemonId,
          name: koreanName,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
        });
        current = current.evolves_to[0];
      } while (current);
      setEvolutionChain(chain);
    };

    const fetchBaseStats = () => {
      const stats = selectedPokemon.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
      setBaseStats(stats);
    };

    fetchEvolutionChain();
    fetchBaseStats();
  }, [selectedPokemon]);

  const types = selectedPokemon.types
    ? selectedPokemon.types
        .map(
          (typeInfo) => typeMapping[typeInfo.type.name] || typeInfo.type.name
        )
        .join(", ")
    : "알 수 없음";

  const statNameMapping = {
    hp: "HP",
    attack: "공격",
    defense: "방어",
    "special-attack": "특수공격",
    "special-defense": "특수방어",
    speed: "스피드",
  };

  const handleClickOutside = (event) => {
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEvolutionClick = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await res.json();
    const speciesRes = await fetch(pokemonData.species.url);
    const speciesData = await speciesRes.json();
    const koreanName = speciesData.names.find(
      (name) => name.language.name === "ko"
    );
    const detailedPokemon = {
      ...pokemonData,
      koreanName: koreanName ? koreanName.name : pokemonData.name,
    };
    setSelectedPokemon(detailedPokemon);
  };

  return (
    <div className="pokemon-detail-overlay">
      <div className="pokemon-detail" ref={detailRef}>
        <div className="pokemon-id">
          {selectedPokemon.id.toString().padStart(3, "0")}
        </div>
        <img
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
        />
        <h2>{selectedPokemon.koreanName}</h2>
        <p>타입: {types}</p>
        <div className="base-stats">
          <h3>종족값</h3>
          <ul>
            {baseStats.map((stat) => (
              <li key={stat.name}>
                <span>{statNameMapping[stat.name]}: </span>
                {stat.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="evolution-chain">
          <h3>진화 루트</h3>
          <ul>
            {evolutionChain.map((species) => (
              <li
                key={species.id}
                onClick={() => handleEvolutionClick(species.id)}
              >
                <div className="evolution-item">
                  <div className="evolution-pokemon-id">
                    {species.id.toString().padStart(3, "0")}
                  </div>
                  <img src={species.image} alt={species.name} />
                  <span>{species.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
