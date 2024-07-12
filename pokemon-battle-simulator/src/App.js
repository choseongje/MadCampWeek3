import React, { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // PokéAPI에서 포켓몬 정보 가져오기
    fetch("https://pokeapi.co/api/v2/pokemon/1") // 포켓몬 번호 1번 (이상해씨) 정보 가져오기
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Pokémon Information</h1>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
