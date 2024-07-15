import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import unevolved from "../../data/unevolved";
import typeMapping from "../../data/typeMapping";
import typeEffectiveness from "../../data/typeEffectiveness";
import evolutionData from "../../data/evolutionData";
import "./PokemonBattle.css";
import BattleContainer from "./BattleContainer";
import Sidebar from "./Sidebar";
import TypeCalculatorOverlay from "./TypeCalculatorOverlay";

const PokemonBattle = () => {
  const navigate = useNavigate();
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
  const [availablePokemon, setAvailablePokemon] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [effectMessage, setEffectMessage] = useState("");
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [showEffectMessage, setShowEffectMessage] = useState(false);
  const [pokemonRounds, setPokemonRounds] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTypeCalculator, setShowTypeCalculator] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [beingAttacked, setBeingAttacked] = useState(false);

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
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${opponent.id}`
    );
    const data = await response.json();
    const koreanName = unevolved.find((p) => p.id === opponent.id).name;
    setOpponentPokemon({ ...data, koreanName });
    setOpponentHp(getPokemonMaxHp(data));
    setShowSwitchPrompt(true);
    setMessage("상대 포켓몬이 나타났다! 포켓몬을 교체하시겠습니까?");
  };

  const fetchSelectedPokemon = async () => {
    const selectedPokemonPromises = selectedPokemon.map((pokemon) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then(
        (response) => response.json()
      )
    );
    const data = await Promise.all(selectedPokemonPromises);
    const dataWithKoreanNames = data.map((pokemon) => {
      const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
      return { ...pokemon, koreanName, currentHp: getPokemonMaxHp(pokemon) };
    });
    setPokemonRounds(
      dataWithKoreanNames.reduce((acc, pokemon) => {
        acc[pokemon.id] = (acc[pokemon.id] || 0) + 1;
        return acc;
      }, {})
    );
    setSelectedPokemonData(dataWithKoreanNames);
    setAllPokemonData(dataWithKoreanNames);
    setSelectedHp(getPokemonMaxHp(dataWithKoreanNames[0]));
    setAvailablePokemon(dataWithKoreanNames.slice(1));
  };

  const getRandomOpponent = () => {
    const randomIndex = Math.floor(Math.random() * unevolved.length);
    return unevolved[randomIndex];
  };

  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  const getPokemonHp = (pokemon) => {
    const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
    return hpStat ? hpStat.base_stat : 0;
  };

  const getPokemonMaxHp = (pokemon) => {
    return getPokemonHp(pokemon) * 2;
  };

  const getPokemonAttack = (pokemon) => {
    const attackStat = pokemon.stats.find(
      (stat) => stat.stat.name === "attack"
    );
    return attackStat ? attackStat.base_stat : 0;
  };

  const calculateHpPercentage = (currentHp, maxHp) => {
    return (currentHp / maxHp) * 100;
  };

  const calculateDamage = (attack, attackerType, defenderTypes) => {
    let multiplier = 1;
    defenderTypes.forEach((type) => {
      if (
        typeEffectiveness[attackerType] &&
        typeEffectiveness[attackerType][type] !== undefined
      ) {
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
      const attackerName = selectedPokemonData[0].koreanName;
      setMessage(`${attackerName}의 ${getTypeNameInKorean(attackType)} 공격!`);
      setAttacking(true);
      setTimeout(() => {
        setAttacking(false);
        const playerAttack = getPokemonAttack(selectedPokemonData[0]);
        const defenderTypes = opponentPokemon.types.map((t) => t.type.name);
        const damage = calculateDamage(playerAttack, attackType, defenderTypes);
        const multiplier = damage / playerAttack;

        setEffectMessage(getEffectivenessMessage(multiplier));
        setShowEffectMessage(true);

        setTimeout(() => {
          setShowEffectMessage(false);
        }, 1000);

        setOpponentHp((prevHp) => {
          const newHp = Math.max(prevHp - damage, 0);
          if (newHp === 0) {
            setMessage("상대 포켓몬이 쓰러졌습니다!");
            setTimeout(() => {
              const evolvablePokemon = selectedPokemonData.filter((pokemon) => {
                const evolution = evolutionData.find(
                  (e) => e.id === pokemon.id
                );
                return evolution && pokemonRounds[pokemon.id] >= 10;
              });

              if (evolvablePokemon.length > 0) {
                navigate("/evolution", {
                  state: {
                    selectedPokemon: selectedPokemonData,
                    round: round + 1,
                    pokemonRounds,
                  },
                });
              } else {
                recoverAllPokemon();
                setShowSwitchPrompt(true);
                setShowTypeSelect(false);
                setRound((prevRound) => prevRound + 1);
                fetchOpponentPokemon();
              }
            }, 1000);
          } else {
            setTimeout(() => {
              setBeingAttacked(true);
              const opponentAttack = getPokemonAttack(opponentPokemon);
              const opponentType = opponentPokemon.types[0].type.name;
              const defenderTypes = selectedPokemonData[0].types.map(
                (t) => t.type.name
              );
              const opponentDamage = calculateDamage(
                opponentAttack,
                opponentType,
                defenderTypes
              );
              const opponentMultiplier = opponentDamage / opponentAttack;

              setEffectMessage(getEffectivenessMessage(opponentMultiplier));
              setShowEffectMessage(true);

              setTimeout(() => {
                setShowEffectMessage(false);
              }, 1000);

              setSelectedHp((prevHp) => {
                const newHp = Math.max(prevHp - opponentDamage, 0);
                if (newHp === 0) {
                  setMessage("내 포켓몬이 쓰러졌습니다! 포켓몬을 선택하세요.");
                  setShowTypeSelect(false);
                  setShowPokemonSelect(true);
                  setAvailablePokemon(
                    availablePokemon.filter((pokemon) => pokemon.currentHp > 0)
                  );
                  if (availablePokemon.length === 0) {
                    setShowPokemonSelect(false);
                    setMessage("모든 포켓몬이 쓰러졌습니다!");
                  }
                } else {
                  setShowSwitchPrompt(false);
                  setShowPokemonSelect(false);
                  setMessage("공격 타입을 선택하세요:");
                  setShowTypeSelect(true);
                }
                return newHp;
              });
              setTimeout(() => {
                setBeingAttacked(false);
              }, 500);
            }, 1000);
          }
          return newHp;
        });
      }, 500);
    }
  };

  const recoverAllPokemon = () => {
    const recoveredPokemon = allPokemonData.map((pokemon) => ({
      ...pokemon,
      currentHp: getPokemonMaxHp(pokemon),
    }));
    setAllPokemonData(recoveredPokemon);
    setAvailablePokemon(
      recoveredPokemon.filter((pokemon) => pokemon.currentHp > 0)
    );
    setSelectedHp(getPokemonMaxHp(selectedPokemonData[0]));
  };

  const handlePokemonSelect = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((response) => response.json())
      .then((data) => {
        const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
        const updatedPokemon = {
          ...data,
          koreanName,
          currentHp: getPokemonMaxHp(data),
        };
        setSelectedPokemonData([updatedPokemon]);
        setSelectedHp(getPokemonMaxHp(updatedPokemon));
        setAvailablePokemon(
          availablePokemon.filter((p) => p.id !== pokemon.id)
        );
        setMessage("");
        setShowSwitchPrompt(false);
        setShowPokemonSelect(false);
        setShowTypeSelect(true);
        setMessage("공격 타입을 선택하세요:");
      });
  };

  const handleSwitchDecision = (decision) => {
    if (decision === "yes") {
      setShowSwitchPrompt(false);
      setShowPokemonSelect(true);
      setShowTypeSelect(false);
      setMessage("포켓몬을 선택하세요:");
    } else {
      setShowSwitchPrompt(false);
      setShowPokemonSelect(false);
      setMessage("공격 타입을 선택하세요:");
      setShowTypeSelect(true);
    }
  };

  const handleTypeSelect = (type) => {
    setShowTypeSelect(false);
    handleAttack(type);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleTypeCalculator = () => {
    setShowTypeCalculator(true);
  };

  return (
    <div className="App">
      <h1>포켓몬 배틀 - 라운드 {round}</h1>
      <BattleContainer
        opponentPokemon={opponentPokemon}
        selectedPokemonData={selectedPokemonData}
        opponentHp={opponentHp}
        selectedHp={selectedHp}
        calculateHpPercentage={calculateHpPercentage}
        getPokemonMaxHp={getPokemonMaxHp}
        attacking={attacking}
        beingAttacked={beingAttacked}
        handleTypeSelect={handleTypeSelect}
        showTypeSelect={showTypeSelect}
        getTypeNameInKorean={getTypeNameInKorean}
      />
      <Sidebar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        handleTypeCalculator={handleTypeCalculator}
      />
      {showTypeCalculator && (
        <TypeCalculatorOverlay setShowTypeCalculator={setShowTypeCalculator} />
      )}
      <div className="message-box">
        <p className="message">{message}</p>
        {showSwitchPrompt && !showPokemonSelect && (
          <div className="switch-prompt">
            <button onClick={() => handleSwitchDecision("yes")}>예</button>
            <button onClick={() => handleSwitchDecision("no")}>아니오</button>
          </div>
        )}
        {showPokemonSelect && (
          <div className="pokemon-list">
            {availablePokemon
              .filter((pokemon) => pokemon.currentHp > 0)
              .map((pokemon) => (
                <button
                  key={pokemon.id}
                  onClick={() => handlePokemonSelect(pokemon)}
                >
                  {pokemon.koreanName}
                </button>
              ))}
          </div>
        )}
        {showTypeSelect && (
          <div className="type-select-box">
            {selectedPokemonData[0].types.map((typeInfo) => (
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
        {showEffectMessage && <p className="effect-message">{effectMessage}</p>}
      </div>
    </div>
  );
};

export default PokemonBattle;
