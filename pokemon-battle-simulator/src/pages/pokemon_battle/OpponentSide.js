import React from "react";

const OpponentSide = ({
  opponentPokemon,
  opponentHp,
  calculateHpPercentage,
  getPokemonMaxHp,
  beingAttacked,
}) => {
  return (
    <div className="opponent-side">
      <h2>상대 포켓몬</h2>
      <div className="hp-bar">
        <div
          className="hp-bar-inner"
          style={{
            width: `${calculateHpPercentage(
              opponentHp,
              getPokemonMaxHp(opponentPokemon)
            )}%`,
          }}
        >
          HP: {opponentHp} / {getPokemonMaxHp(opponentPokemon)}
        </div>
      </div>
      <img
        src={opponentPokemon.sprites.front_default}
        alt={opponentPokemon.koreanName}
        className={`opponent-image ${beingAttacked ? "blink" : ""}`}
      />
      <h2>{opponentPokemon.koreanName}</h2>
    </div>
  );
};

export default OpponentSide;
