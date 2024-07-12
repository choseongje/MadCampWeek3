import React, { useEffect, useState } from "react";
import unevolved from "./unevolved";
import typeMapping from "./typeMapping";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
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
  }, []);

  const getTypeIconUrl = (type) => `/icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  return (
    <div className="App">
      <h1>Pokémon Information</h1>
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemon) => (
          <div key={pokemon.id}>
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
                    style={{
                      width: "24px",
                      height: "24px",
                      verticalAlign: "middle",
                      marginRight: "4px",
                    }}
                  />
                  {getTypeNameInKorean(typeInfo.type.name)}
                </span>
              ))}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
