// src/pages/GameOver.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameOver.css"; // 별도의 CSS 파일로 스타일링

const GameOver = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/"); // 홈 화면으로 이동
  };

  return (
    <div className="game-over-container">
      <h1>게임 오버</h1>
      <p>모든 포켓몬이 쓰러졌습니다!</p>
      <button onClick={handleRestart}>다시 시작</button>
    </div>
  );
};

export default GameOver;
