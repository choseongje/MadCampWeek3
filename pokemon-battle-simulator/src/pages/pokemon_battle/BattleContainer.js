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
  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;

  return (
    <div className="battle-container">
      {opponentPokemon && selectedPokemonData ? (
        <>
          <div className="opponent-pokemon">
            <img
              src={opponentPokemon.sprites.front_default}
              alt={opponentPokemon.koreanName}
              className={`opponent-image ${
                opponentAttacking ? "opponent-attacking" : ""
              } ${beingAttacked ? "being-attacked" : ""}`}
            />
            <div className="opponent-name-container">
              <span className="opponent-name">
                {opponentPokemon.koreanName}
              </span>
              <div className="opponent-pokemon-types">
                {opponentPokemon.types.map((typeInfo) => (
                  <img
                    key={typeInfo.type.name}
                    src={getTypeIconUrl(typeInfo.type.name)}
                    alt={getTypeNameInKorean(typeInfo.type.name)}
                    className="pokemon-type-icon"
                  />
                ))}
              </div>
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
            <img
              src={selectedPokemonData[0].sprites.back_default}
              alt={selectedPokemonData[0].koreanName}
              className={`player-image ${attacking ? "attacking" : ""} ${
                opponentBeingAttacked ? "being-attacked" : ""
              }`}
            />
            <div className="player-name-container">
              <span className="player-name">
                {selectedPokemonData[0].koreanName}
              </span>
              <div className="player-pokemon-types">
                {selectedPokemonData[0].types.map((typeInfo) => (
                  <img
                    key={typeInfo.type.name}
                    src={getTypeIconUrl(typeInfo.type.name)}
                    alt={getTypeNameInKorean(typeInfo.type.name)}
                    className="pokemon-type-icon"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="player-hp-bar">
            <div
              className="player-hp-bar-inner"
              style={{
                width: `${calculateHpPercentage(
                  selectedHp,
                  getPokemonMaxHp(selectedPokemonData[0])
                )}%`,
              }}
            />
          </div>
          <div className="player-hp-text">
            HP: {selectedHp} / {getPokemonMaxHp(selectedPokemonData[0])}
          </div>
        </>
      ) : (
        <p>포켓몬 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default BattleContainer;
