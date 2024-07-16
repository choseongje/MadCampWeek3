// src/pages/pokedex/Pokedex.js
import React, { useEffect, useState, useCallback } from "react";
import PokedexCard from "./PokedexCard";
import PokemonDetail from "./PokemonDetail";
import "./Pokedex.css";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const fetchPokemonList = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    const response = await fetch(nextUrl);
    const data = await response.json();

    // Get offset and limit from nextUrl to calculate the next batch
    const nextOffsetMatch = nextUrl.match(/offset=(\d+)/);
    const nextLimitMatch = nextUrl.match(/limit=(\d+)/);
    const nextOffset = nextOffsetMatch ? parseInt(nextOffsetMatch[1], 10) : 0;
    const nextLimit = nextLimitMatch ? parseInt(nextLimitMatch[1], 10) : 20;

    // Calculate if the next batch will exceed the limit of 1024
    const remainingCount = 1024 - nextOffset;
    const fetchLimit = remainingCount < nextLimit ? remainingCount : nextLimit;

    const detailedPokemonList = await Promise.all(
      data.results.slice(0, fetchLimit).map(async (pokemon) => {
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

    setPokemonList((prevList) => [...prevList, ...detailedPokemonList]);

    // Update nextUrl if we still need to fetch more Pokemon
    if (nextOffset + fetchLimit >= 1024) {
      setNextUrl(null);
    } else {
      setNextUrl(data.next);
    }

    setLoading(false);
  }, [nextUrl, loading]);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 50 &&
        !loading
      ) {
        fetchPokemonList();
      }
    };

    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [fetchPokemonList, loading]);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetail = () => {
    setSelectedPokemon(null);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery) return;

    // 검색어가 숫자인 경우 번호로 검색
    if (!isNaN(searchQuery)) {
      const id = parseInt(searchQuery, 10);
      if (id > 0 && id <= 1024) {
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
        setSearchResult(detailedPokemon);
        setSelectedPokemon(detailedPokemon);
        return;
      }
    }

    // 한글 이름으로 검색
    const foundPokemon = pokemonList.find(
      (pokemon) => pokemon.koreanName === searchQuery
    );
    if (foundPokemon) {
      setSearchResult(foundPokemon);
      setSelectedPokemon(foundPokemon);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="pokedex">
      <h1>Pokémon Pokédex</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="포켓몬 번호 또는 이름으로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>
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
