import React from "react";
import "./BattleContainer.css"; // CSS 파일을 import

const BattleContainer = ({
  opponentPokemon,
  selectedPokemonData,
  opponentHp,
  selectedHp,
  calculateHpPercentage,
  getPokemonMaxHp,
  attacking,
  beingAttacked,
  getTypeNameInKorean,
  opponentAttacking,
  opponentBeingAttacked,
}) => {
  if (!opponentPokemon || selectedPokemonData.length === 0) {
    return <p>포켓몬 데이터를 불러오는 중...</p>;
  }

  const selectedPokemon = selectedPokemonData[0];

  return (
    <div className="battle-container">
      <div className="opponent-pokemon">
        {opponentPokemon.sprites && (
          <img
            src={opponentPokemon.sprites.front_default}
            alt={opponentPokemon.koreanName}
            className={`opponent-image ${
              opponentAttacking ? "opponent-attacking" : ""
            } ${beingAttacked ? "being-attacked" : ""}`}
          />
        )}
        <div className="opponent-name-container">
          <h2 className="opponent-name">{opponentPokemon.koreanName}</h2>
        </div>
      </div>
      <div className="opponent-hp-bar">
        <div
          className="opponent-hp-bar-inner"
          style={{
            width: `${calculateHpPercentage(
              opponentHp,
              getPokemonMaxHp(opponentPokemon)
            )}%`,
          }}
        />
      </div>

      <div className="player-pokemon">
        {selectedPokemon.sprites && (
          <img
            src={selectedPokemon.sprites.back_default}
            alt={selectedPokemon.koreanName}
            className={`player-image ${attacking ? "attacking" : ""} ${
              opponentBeingAttacked ? "being-attacked" : ""
            }`}
          />
        )}
        <div className="player-name-container">
          <h2 className="player-name">{selectedPokemon.koreanName}</h2>
        </div>
      </div>
      <div className="player-hp-bar">
        <div
          className="player-hp-bar-inner"
          style={{
            width: `${calculateHpPercentage(
              selectedHp,
              getPokemonMaxHp(selectedPokemon)
            )}%`,
          }}
        />
      </div>
      <div className="player-hp-text">
        HP: {selectedHp} / {getPokemonMaxHp(selectedPokemon)}
      </div>
    </div>
  );
};

export default BattleContainer;
