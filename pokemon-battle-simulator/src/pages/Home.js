import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/select-pokemon");
  };

  return (
    <div className="App">
      <div className="start-screen">
        <h1>Pokémon Battle Simulator</h1>
        <button onClick={handleStartGame}>게임 시작</button>
      </div>
    </div>
  );
};

export default Home;
