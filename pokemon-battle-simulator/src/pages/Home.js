// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // 애니메이션 시간 (2초)
    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = () => {
    navigate("/select-pokemon");
  };

  const handlePokedex = () => {
    navigate("/pokedex");
  };

  return (
    <div className="App">
      <div className="start-screen">
        <h1>Pokémon Battle Simulator</h1>
        <button onClick={handleStartGame}>게임 시작</button>
        <button onClick={handlePokedex}>포켓몬 도감</button>
      </div>
      {showAnimation && <div className="pokeball-animation-close"></div>}
    </div>
  );
};

export default Home;
