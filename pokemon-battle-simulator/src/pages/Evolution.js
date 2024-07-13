import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import evolutionData from '../data/evolutionData';
import unevolved from '../data/unevolved';

const Evolution = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPokemon, round, pokemonRounds } = location.state || { selectedPokemon: [], round: 1, pokemonRounds: {} };

  const [evolvedPokemonData, setEvolvedPokemonData] = useState([]);

  useEffect(() => {
    const fetchEvolvedPokemon = async () => {
      const evolvedPokemonPromises = selectedPokemon.map(pokemon => {
        const evolution = evolutionData.find(e => e.id === pokemon.id);
        if (evolution) {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.evolvesTo}`)
            .then(response => response.json())
            .then(data => {
              const koreanName = unevolved.find(p => p.id === evolution.evolvesTo).name;
              return { ...data, koreanName };
            });
        }
        return Promise.resolve(pokemon);
      });

      const data = await Promise.all(evolvedPokemonPromises);
      setEvolvedPokemonData(data);
    };

    fetchEvolvedPokemon();
  }, [selectedPokemon]);

  const handleContinue = () => {
    navigate('/battle', { state: { selectedPokemon: evolvedPokemonData, round, pokemonRounds } });
  };

  return (
    <div className="App">
      <h1>포켓몬 진화</h1>
      <div className="evolution-container">
        {evolvedPokemonData.length > 0 ? (
          evolvedPokemonData.map(pokemon => (
            <div key={pokemon.id} className="pokemon-card">
              <h2>{pokemon.koreanName}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.koreanName} />
              <p>HP: {pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat * 2}</p>
              <p>Attack: {pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
            </div>
          ))
        ) : (
          <p>포켓몬 데이터를 불러오는 중...</p>
        )}
      </div>
      <button onClick={handleContinue}>진행하기</button>
    </div>
  );
};

export default Evolution;
