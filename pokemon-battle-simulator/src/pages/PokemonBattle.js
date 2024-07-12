import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import unevolved from "../data/unevolved";
import typeMapping from "../data/typeMapping";
import typeEffectiveness from "../data/typeEffectiveness";
import "./PokemonBattle.css"; // Import the CSS file

const PokemonBattle = () => {
  const location = useLocation();
  const { selectedPokemon } = location.state || { selectedPokemon: [] };
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);
  const [opponentHp, setOpponentHp] = useState(0);
  const [selectedHp, setSelectedHp] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState("");
  const [showSwitchPrompt, setShowSwitchPrompt] = useState(false);
  const [showPokemonSelect, setShowPokemonSelect] = useState(false);
  const [availablePokemon, setAvailablePokemon] = useState(selectedPokemon.slice(1));
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [effectMessage, setEffectMessage] = useState("");
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  useEffect(() => {
    fetchSelectedPokemon();
  }, [selectedPokemon]);

  useEffect(() => {
    if (round === 1 || opponentPokemon === null) {
      fetchOpponentPokemon();
    }
  }, [round]);

  const fetchOpponentPokemon = async () => {
    const opponent = getRandomOpponent();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${opponent.id}`);
    const data = await response.json();
    const koreanName = unevolved.find((p) => p.id === opponent.id).name;
    setOpponentPokemon({ ...data, koreanName });
    setOpponentHp(getPokemonMaxHp(data));
    setShowSwitchPrompt(true); // Show switch prompt after fetching opponent Pokemon
  };

  const fetchSelectedPokemon = async () => {
    const selectedPokemonPromises = selectedPokemon.map(pokemon =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then(response => response.json())
    );
    const data = await Promise.all(selectedPokemonPromises);
    const dataWithKoreanNames = data.map((pokemon) => {
      const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
      return { ...pokemon, koreanName };
    });
    setSelectedPokemonData(dataWithKoreanNames);
    setAllPokemonData(dataWithKoreanNames); // Save all Pokemon data for future reference
    setSelectedHp(getPokemonMaxHp(dataWithKoreanNames[0]));
  };

  const getRandomOpponent = () => {
    const randomIndex = Math.floor(Math.random() * unevolved.length);
    return unevolved[randomIndex];
  };

  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  const getPokemonHp = (pokemon) => {
    const hpStat = pokemon.stats.find(stat => stat.stat.name === 'hp');
    return hpStat ? hpStat.base_stat : 0;
  };

  const getPokemonMaxHp = (pokemon) => {
    return getPokemonHp(pokemon) * 2;
  };

  const getPokemonAttack = (pokemon) => {
    const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack');
    return attackStat ? attackStat.base_stat : 0;
  };

  const calculateHpPercentage = (currentHp, maxHp) => {
    return (currentHp / maxHp) * 100;
  };

  const calculateDamage = (attack, attackerType, defenderTypes) => {
    let multiplier = 1;
    defenderTypes.forEach(type => {
      if (typeEffectiveness[attackerType] && typeEffectiveness[attackerType][type]) {
        multiplier *= typeEffectiveness[attackerType][type];
      }
    });
    return attack * multiplier;
  };

  const getEffectivenessMessage = (multiplier) => {
    if (multiplier > 1) {
      return "효과가 굉장했다!";
    } else if (multiplier < 1 && multiplier > 0) {
      return "효과가 별로인 듯하다...";
    } else if (multiplier === 0) {
      return "효과가 없는 듯하다...";
    } else {
      return "";
    }
  };

  const handleAttack = (attackType) => {
    if (opponentPokemon && selectedPokemonData) {
      const playerAttack = getPokemonAttack(selectedPokemonData[0]);
      const defenderTypes = opponentPokemon.types.map(t => t.type.name);
      const damage = calculateDamage(playerAttack, attackType, defenderTypes);
      const multiplier = damage / playerAttack;

      setEffectMessage(getEffectivenessMessage(multiplier));

      setOpponentHp(prevHp => {
        const newHp = Math.max(prevHp - damage, 0);
        if (newHp === 0) {
          setMessage("상대 포켓몬이 쓰러졌습니다!");
          setTimeout(() => {
            setShowSwitchPrompt(true);
            setShowTypeSelect(false);
            setRound(prevRound => prevRound + 1);
            fetchOpponentPokemon();
          }, 1000);
        } else {
          setTimeout(() => {
            const opponentAttack = getPokemonAttack(opponentPokemon);
            const opponentDamage = calculateDamage(opponentAttack, opponentPokemon.types[0].type.name, selectedPokemonData[0].types.map(t => t.type.name));
            const opponentMultiplier = opponentDamage / opponentAttack;

            setEffectMessage(getEffectivenessMessage(opponentMultiplier));

            setSelectedHp(prevHp => {
              const newHp = Math.max(prevHp - opponentDamage, 0);
              if (newHp === 0) {
                setMessage("내 포켓몬이 쓰러졌습니다! 포켓몬을 선택하세요.");
                if (availablePokemon.length === 0) {
                  setGameOver(true);
                }
              }
              return newHp;
            });
          }, 1000);
        }
        return newHp;
      });
    }
  };

  const recoverAllPokemon = () => {
    const recoveredPokemon = allPokemonData.map(pokemon => ({
      ...pokemon,
      hp: getPokemonMaxHp(pokemon)
    }));
    setAllPokemonData(recoveredPokemon);
    setAvailablePokemon(recoveredPokemon);
    setSelectedHp(getPokemonMaxHp(selectedPokemonData[0]));
  };

  const handlePokemonSelect = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(response => response.json())
      .then(data => {
        const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
        const updatedPokemon = { ...data, koreanName };
        setSelectedPokemonData([updatedPokemon]);
        setSelectedHp(getPokemonMaxHp(updatedPokemon));
        setAvailablePokemon(availablePokemon.filter(p => p.id !== pokemon.id));
        setMessage("");
        setShowSwitchPrompt(false);
        setShowPokemonSelect(false);
        setShowTypeSelect(true);
      });
  };

  const handleSwitchDecision = (decision) => {
    if (decision === 'yes') {
      setShowPokemonSelect(true);
      setShowTypeSelect(false);
    } else {
      setShowSwitchPrompt(false);
      setShowPokemonSelect(false);
      setMessage("");
      setShowTypeSelect(true);
    }
  };

  const handleTypeSelect = (type) => {
    handleAttack(type);
  };

  return (
    <div className="App">
      <h1>포켓몬 배틀 - 라운드 {round}</h1>
      <div className="battle-container">
        {opponentPokemon && selectedPokemonData ? (
          <>
            <div className="opponent-side">
              <h2>상대 포켓몬</h2>
              <div className="hp-bar">
                <div className="hp-bar-inner" style={{ width: `${calculateHpPercentage(opponentHp, getPokemonMaxHp(opponentPokemon))}%` }}>
                  HP: {opponentHp} / {getPokemonMaxHp(opponentPokemon)}
                </div>
              </div>
              <img
                src={opponentPokemon.sprites.front_default}
                alt={opponentPokemon.koreanName}
                className="opponent-image"
              />
              <h2>{opponentPokemon.koreanName}</h2>
            </div>
            <div className="player-side">
              <h2>내 포켓몬</h2>
              <div className="hp-bar">
                <div className="hp-bar-inner" style={{ width: `${calculateHpPercentage(selectedHp, getPokemonMaxHp(selectedPokemonData[0]))}%` }}>
                  HP: {selectedHp} / {getPokemonMaxHp(selectedPokemonData[0])}
                </div>
              </div>
              <div className="pokemon-back">
                <h2>{selectedPokemonData[0].koreanName}</h2>
                <img
                  src={selectedPokemonData[0].sprites.back_default}
                  alt={selectedPokemonData[0].koreanName}
                />
              </div>
              {selectedHp > 0 && showTypeSelect && (
                <div className="type-select-box">
                  <h3>공격 타입을 선택하세요:</h3>
                  {selectedPokemonData[0].types.map(typeInfo => (
                    <button
                      key={typeInfo.type.name}
                      onClick={() => handleTypeSelect(typeInfo.type.name)}
                      className="type-button"
                    >
                      {getTypeNameInKorean(typeInfo.type.name)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p>포켓몬 데이터를 불러오는 중...</p>
        )}
      </div>
      {effectMessage && <p className="effect-message">{effectMessage}</p>}
      {selectedHp === 0 && !gameOver && (
        <div className="pokemon-select">
          <h2>남은 포켓몬을 선택하세요</h2>
          <div className="pokemon-list">
            {availablePokemon.map(pokemon => (
              <button key={pokemon.id} onClick={() => handlePokemonSelect(pokemon)}>
                {pokemon.koreanName}
              </button>
            ))}
          </div>
        </div>
      )}
      {showSwitchPrompt && !showPokemonSelect && (
        <div className="switch-prompt">
          <h2>포켓몬을 교체하시겠습니까?</h2>
          <button onClick={() => handleSwitchDecision('yes')}>예</button>
          <button onClick={() => handleSwitchDecision('no')}>아니오</button>
        </div>
      )}
      {showPokemonSelect && (
        <div className="pokemon-select">
          <h2>포켓몬을 선택하세요</h2>
          <div className="pokemon-list">
            {allPokemonData.map(pokemon => (
              <button key={pokemon.id} onClick={() => handlePokemonSelect(pokemon)}>
                {pokemon.koreanName}
              </button>
            ))}
          </div>
        </div>
      )}
      {gameOver && (
        <div className="game-over">
          <h2>게임 오버!</h2>
          <p>모든 포켓몬이 쓰러졌습니다.</p>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PokemonBattle;
