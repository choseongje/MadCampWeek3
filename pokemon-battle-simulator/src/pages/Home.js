import React, { useEffect, useState } from "react";
import unevolved from "../data/unevolved";
import typeMapping from "../data/typeMapping";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameStarted) {
      const fetchPokemon = async () => {
        const selectedPokemon = [];
        while (selectedPokemon.length < 6) {
          const randomIndex = Math.floor(Math.random() * unevolved.length);
          const randomPokemon = unevolved[randomIndex];
          if (!selectedPokemon.includes(randomPokemon)) {
            selectedPokemon.push(randomPokemon);
          }
        }

        const promises = selectedPokemon.map((pokemon) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then(
            (response) => response.json()
          )
        );
        const data = await Promise.all(promises);

        const dataWithKoreanNames = data.map((pokemon) => {
          const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
          return { ...pokemon, koreanName };
        });

        setPokemonList(dataWithKoreanNames);
      };

      fetchPokemon().catch((error) =>
        console.error("Error fetching data:", error)
      );
    }
  }, [gameStarted]);

  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  const handlePokemonClick = (id) => {
    setSelectedPokemon((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pid) => pid !== id)
        : prevSelected.length < 3
        ? [...prevSelected, id]
        : prevSelected
    );
  };

  const handleStartGame = () => {
    navigate("/selected-pokemon", {
      state: {
        selectedPokemon: pokemonList.filter((pokemon) =>
          selectedPokemon.includes(pokemon.id)
        ),
      },
    });
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Pokémon Battle Simulator</h1>
          <button onClick={() => setGameStarted(true)}>게임 시작</button>
        </div>
      ) : (
        <div className="pokemon-container">
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                getTypeIconUrl={getTypeIconUrl}
                getTypeNameInKorean={getTypeNameInKorean}
                isSelected={selectedPokemon.includes(pokemon.id)}
                onClick={() => handlePokemonClick(pokemon.id)}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
          {selectedPokemon.length === 3 && (
            <button onClick={handleStartGame} className="start-game-button">
              게임 시작!
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
