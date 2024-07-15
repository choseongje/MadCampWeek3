import React from "react";

const PlayerSide = ({
  selectedPokemonData,
  selectedHp,
  calculateHpPercentage,
  getPokemonMaxHp,
  attacking,
  handleTypeSelect,
  showTypeSelect,
  getTypeNameInKorean,
}) => {
  return (
    <div className="player-side">
      <h2>내 포켓몬</h2>
      <div className="hp-bar">
        <div
          className="hp-bar-inner"
          style={{
            width: `${calculateHpPercentage(
              selectedHp,
              getPokemonMaxHp(selectedPokemonData[0])
            )}%`,
          }}
        >
          HP: {selectedHp} / {getPokemonMaxHp(selectedPokemonData[0])}
        </div>
      </div>
      <div className={`pokemon-back ${attacking ? "attack" : ""}`}>
        <h2>{selectedPokemonData[0].koreanName}</h2>
        <img
          src={selectedPokemonData[0].sprites.back_default}
          alt={selectedPokemonData[0].koreanName}
        />
      </div>
    </div>
  );
};

export default PlayerSide;
