import React from "react";

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
  return (
    <div className="battle-container">
      {opponentPokemon && selectedPokemonData ? (
        <>
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
              className={`opponent-image ${
                opponentAttacking ? "opponent-attacking" : ""
              } ${beingAttacked ? "being-attacked" : ""}`}
            />
            <h2>{opponentPokemon.koreanName}</h2>
          </div>
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
            <div className="pokemon-back">
              <h2>{selectedPokemonData[0].koreanName}</h2>
              <img
                src={selectedPokemonData[0].sprites.back_default}
                alt={selectedPokemonData[0].koreanName}
                className={`player-image ${attacking ? "attacking" : ""} ${
                  opponentBeingAttacked ? "being-attacked" : ""
                }`}
              />
            </div>
          </div>
        </>
      ) : (
        <p>포켓몬 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default BattleContainer;
