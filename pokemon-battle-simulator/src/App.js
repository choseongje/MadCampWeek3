import React, { useEffect, useState } from "react";
import unevolved from "./unevolved";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      // 포켓몬 목록에서 랜덤으로 6마리 선택
      const selectedPokemon = [];
      while (selectedPokemon.length < 6) {
        const randomIndex = Math.floor(Math.random() * unevolved.length);
        const randomPokemon = unevolved[randomIndex];
        if (!selectedPokemon.includes(randomPokemon)) {
          selectedPokemon.push(randomPokemon);
        }
      }

      // 선택된 포켓몬들의 정보 가져오기
      const promises = selectedPokemon.map((pokemon) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then((response) => response.json())
      );
      const data = await Promise.all(promises);

      // 한글 이름을 매칭
      const dataWithKoreanNames = data.map((pokemon) => {
        const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
        return { ...pokemon, koreanName };
      });

      setPokemonList(dataWithKoreanNames);
    };

    fetchPokemon().catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <h1>Pokémon Information</h1>
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => (
          <div key={pokemon.id}>
            <h2>{pokemon.koreanName}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.koreanName} />
            <p>Type: {pokemon.types.map((typeInfo) => typeInfo.type.name).join(", ")}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
