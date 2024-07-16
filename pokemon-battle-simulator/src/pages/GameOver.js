import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import "../pages/GameOver.css";
import typeMapping from "../data/typeMapping"; // typeMapping 가져오기

const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

const GameOver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { round, selectedPokemon } = location.state || {};

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="game-over-container">
      <h1>게임 오버</h1>
      <p>진행한 라운드 : {round}</p>
      <div className="pokemon-card-container">
        {selectedPokemon &&
          selectedPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              getTypeIconUrl={getTypeIconUrl}
              getTypeNameInKorean={getTypeNameInKorean}
            />
          ))}
      </div>
      <button className="start-game-button" onClick={handleRestart}>
        메인 화면으로
      </button>
    </div>
  );
};

export default GameOver;
