import React from "react";
import OpponentSide from "./OpponentSide";
import PlayerSide from "./PlayerSide";

const BattleContainer = ({
  opponentPokemon,
  selectedPokemonData,
  opponentHp,
  selectedHp,
  calculateHpPercentage,
  getPokemonMaxHp,
  attacking,
  beingAttacked,
  handleTypeSelect,
  showTypeSelect,
  getTypeNameInKorean,
}) => {
  return (
    <div className="battle-container">
      {opponentPokemon && selectedPokemonData ? (
        <>
          <OpponentSide
            opponentPokemon={opponentPokemon}
            opponentHp={opponentHp}
            calculateHpPercentage={calculateHpPercentage}
            getPokemonMaxHp={getPokemonMaxHp}
            beingAttacked={beingAttacked}
          />
          <PlayerSide
            selectedPokemonData={selectedPokemonData}
            selectedHp={selectedHp}
            calculateHpPercentage={calculateHpPercentage}
            getPokemonMaxHp={getPokemonMaxHp}
            attacking={attacking}
            handleTypeSelect={handleTypeSelect}
            showTypeSelect={showTypeSelect}
            getTypeNameInKorean={getTypeNameInKorean}
          />
        </>
      ) : (
        <p>포켓몬 데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default BattleContainer;
