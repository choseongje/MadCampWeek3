import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import unevolved from "../../data/unevolved";
import legendary from "../../data/legendary"; // 전설의 포켓몬 데이터 가져오기
import typeMapping from "../../data/typeMapping";
import typeEffectiveness from "../../data/typeEffectiveness";
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
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTypeCalculator, setShowTypeCalculator] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [beingAttacked, setBeingAttacked] = useState(false);
  const [opponentAttacking, setOpponentAttacking] = useState(false);
  const [opponentBeingAttacked, setOpponentBeingAttacked] = useState(false);
  const [showCatchPrompt, setShowCatchPrompt] = useState(false);
  const [showReplacePrompt, setShowReplacePrompt] = useState(false);
  const [recovered, setRecovered] = useState(false);

  useEffect(() => {
    fetchSelectedPokemon();
  }, [selectedPokemon]);

  useEffect(() => {
    if (round === 1 || opponentPokemon === null) {
      fetchOpponentPokemon();
    }
  }, [round]);

  useEffect(() => {
    if (recovered) {
      recoverAllPokemon();
      setRound((prevRound) => prevRound + 1);
      fetchOpponentPokemon();
      setRecovered(false);
    }
  }, [recovered]);

  const fetchOpponentPokemon = async () => {
    const opponent = getRandomOpponent();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${opponent.id}`
    );
    const data = await response.json();
    const koreanName =
      unevolved.find((p) => p.id === opponent.id)?.name ||
      legendary.find((p) => p.id === opponent.id)?.name ||
      opponent.name;
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
      const koreanName = unevolved.find((p) => p.id === pokemon.id)?.name;
      return { ...pokemon, koreanName, currentHp: getPokemonMaxHp(pokemon) };
    });
    setSelectedPokemonData(dataWithKoreanNames);
    setSelectedHp(getPokemonMaxHp(dataWithKoreanNames[0]));
    setAvailablePokemon(dataWithKoreanNames.slice(0));
  };

  const getRandomOpponent = () => {
    console.log(`Current Round: ${round}`);
    if ((round + 1) % 5 === 0 && round !== 1) {
      const randomIndex = Math.floor(Math.random() * legendary.length);
      console.log("Selected Legendary Pokemon");
      return legendary[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * unevolved.length);
      console.log("Selected Unevolved Pokemon");
      return unevolved[randomIndex];
    }
  };

  const getTypeIconUrl = (type) => `/type_icons/${type.toLowerCase()}.svg`;
  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  const getPokemonHp = (pokemon) => {
    const hpStat = pokemon.stats.find((stat) => stat.stat.name === "hp");
    return hpStat ? hpStat.base_stat : 0;
  };

  const getPokemonDefense = (pokemon) => {
    const defenseStat = pokemon.stats.find(
      (stat) => stat.stat.name === "defense"
    );
    const specialDefenseStat = pokemon.stats.find(
      (stat) => stat.stat.name === "special-defense"
    );
    const defense = defenseStat ? defenseStat.base_stat : 0;
    const specialDefense = specialDefenseStat
      ? specialDefenseStat.base_stat
      : 0;
    return (defense + specialDefense) / 2; // 평균 방어력
  };

  const getPokemonMaxHp = (pokemon) => {
    const hp = getPokemonHp(pokemon);
    const defense = getPokemonDefense(pokemon);
    return Math.round(hp + defense); // 체력과 평균 방어력을 반영한 최대 체력
  };

  const getPokemonAttack = (pokemon) => {
    const attackStat = pokemon.stats.find(
      (stat) => stat.stat.name === "attack"
    );
    const specialAttackStat = pokemon.stats.find(
      (stat) => stat.stat.name === "special-attack"
    );
    const attack = attackStat ? attackStat.base_stat : 0;
    const specialAttack = specialAttackStat ? specialAttackStat.base_stat : 0;
    return Math.round((attack + specialAttack) / 2); // 평균 공격력
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
    return Math.round(attack * multiplier);
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

      // 플레이어 포켓몬의 공격 메시지를 설정
      setMessage(`${attackerName}의 ${getTypeNameInKorean(attackType)} 공격!`);
      setAttacking(true);

      // 0.5초 후 공격을 실행
      setTimeout(() => {
        setAttacking(false);
        const playerAttack = getPokemonAttack(selectedPokemonData[0]);
        const defenderTypes = opponentPokemon.types.map((t) => t.type.name);
        const damage = calculateDamage(playerAttack, attackType, defenderTypes);
        const multiplier = damage / playerAttack;

        // 공격의 효과 메시지를 설정
        setMessage(getEffectivenessMessage(multiplier));
        setBeingAttacked(true);

        // 0.5초 후 상대 포켓몬의 HP를 업데이트
        setTimeout(() => {
          setBeingAttacked(false);
          setOpponentHp((prevHp) => {
            const newHp = Math.max(prevHp - damage, 0);

            if (newHp === 0) {
              // 상대 포켓몬이 쓰러졌을 때의 메시지를 설정
              setMessage("상대 포켓몬이 쓰러졌습니다!");
              setTimeout(() => {
                setMessage("해당 포켓몬을 잡으시겠습니까?");
                setShowCatchPrompt(true);
              }, 1000);
            } else {
              // 상대 포켓몬이 쓰러지지 않았을 경우 상대 포켓몬의 공격 실행
              setTimeout(() => {
                const opponentAttack = getPokemonAttack(opponentPokemon);
                const opponentTypes = opponentPokemon.types.map(
                  (t) => t.type.name
                );
                const opponentType =
                  opponentTypes[
                    Math.floor(Math.random() * opponentTypes.length)
                  ]; // 랜덤 타입 선택
                const defenderTypes = selectedPokemonData[0].types.map(
                  (t) => t.type.name
                );
                const opponentDamage = calculateDamage(
                  opponentAttack,
                  opponentType,
                  defenderTypes
                );
                const opponentMultiplier = opponentDamage / opponentAttack;

                // 상대 포켓몬의 공격 메시지를 설정
                setMessage(
                  `${opponentPokemon.koreanName}의 ${getTypeNameInKorean(
                    opponentType
                  )} 공격!`
                );
                setOpponentAttacking(true);

                // 0.5초 후 상대 포켓몬의 공격 효과 메시지를 설정
                setTimeout(() => {
                  setOpponentAttacking(false);
                  setMessage(getEffectivenessMessage(opponentMultiplier));
                  setOpponentBeingAttacked(true);

                  // 0.5초 후 플레이어 포켓몬의 HP를 업데이트
                  setTimeout(() => {
                    setOpponentBeingAttacked(false);
                    setSelectedHp((prevHp) => {
                      const newHp = Math.max(prevHp - opponentDamage, 0);
                      if (newHp === 0) {
                        // 플레이어 포켓몬이 쓰러졌을 때의 메시지를 설정
                        setMessage(
                          "내 포켓몬이 쓰러졌습니다! 포켓몬을 선택하세요."
                        );
                        setShowTypeSelect(false);
                        setAvailablePokemon((prevAvailable) =>
                          prevAvailable.filter(
                            (pokemon) =>
                              pokemon.id !== selectedPokemonData[0].id
                          )
                        );
                        setShowPokemonSelect(true);
                        if (availablePokemon.length === 0) {
                          setMessage("모든 포켓몬이 쓰러졌습니다!");
                          const pokemonData = selectedPokemonData.map(
                            (pokemon) => ({
                              id: pokemon.id,
                              koreanName: pokemon.koreanName,
                              sprites: pokemon.sprites,
                              types: pokemon.types,
                            })
                          );

                          navigate("/game-over", {
                            state: {
                              round,
                              selectedPokemon: pokemonData,
                            },
                          });
                        }
                      } else {
                        // 플레이어가 다음 공격 타입을 선택할 수 있도록 메시지를 설정
                        setMessage("공격 타입을 선택하세요:");
                        setShowTypeSelect(true);
                      }
                      return newHp;
                    });
                  }, 500);
                }, 500);
              }, 500);
            }
            return newHp;
          });
        }, 500);
      }, 500);
    }
  };

  const recoverAllPokemon = () => {
    const recoveredPokemon = selectedPokemonData.map((pokemon) => ({
      ...pokemon,
      currentHp: getPokemonMaxHp(pokemon),
    }));
    setAvailablePokemon(
      recoveredPokemon.filter((pokemon) => pokemon.currentHp > 0)
    );
    setSelectedHp(getPokemonMaxHp(selectedPokemonData[0]));
  };

  const handlePokemonSelect = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((response) => response.json())
      .then((data) => {
        const koreanName = unevolved.find((p) => p.id === pokemon.id)?.name;
        const updatedPokemon = {
          ...data,
          koreanName,
          currentHp: getPokemonMaxHp(data),
        };
        setSelectedPokemonData((prevData) => {
          const newData = prevData.filter((p) => p.id !== updatedPokemon.id);
          return [updatedPokemon, ...newData];
        });
        setSelectedHp(getPokemonMaxHp(updatedPokemon));
        setAvailablePokemon(
          availablePokemon.filter((p) => p.id !== pokemon.id)
        );
        setMessage(`가랏! ${koreanName}!`);
        setShowSwitchPrompt(false);
        setShowPokemonSelect(false);
        setShowTypeSelect(false);
        setTimeout(() => {
          setShowTypeSelect(true);
          setMessage("공격 타입을 선택하세요:");
        }, 1000);
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

  const handleSurrender = () => {
    const pokemonData = selectedPokemonData.map((pokemon) => ({
      id: pokemon.id,
      koreanName: pokemon.koreanName,
      sprites: pokemon.sprites,
      types: pokemon.types,
    }));

    navigate("/game-over", {
      state: {
        round,
        selectedPokemon: pokemonData,
      },
    });
  };

  const handleCatch = () => {
    setShowCatchPrompt(false);
    setMessage("교체할 포켓몬을 선택하세요.");
    setShowReplacePrompt(true);
  };

  const handleReplace = (pokemonToReplace) => {
    const newPokemonList = selectedPokemonData.map((pokemon) =>
      pokemon.id === pokemonToReplace.id ? opponentPokemon : pokemon
    );
    setSelectedPokemonData(newPokemonList);
    setAvailablePokemon(newPokemonList);
    setShowReplacePrompt(false);
    setRecovered(true);
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
        handleTypeSelect={handleTypeSelect}
        showTypeSelect={showTypeSelect}
        getTypeNameInKorean={getTypeNameInKorean}
        attacking={attacking}
        beingAttacked={beingAttacked}
        opponentAttacking={opponentAttacking}
        opponentBeingAttacked={opponentBeingAttacked}
      />
      <Sidebar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        handleTypeCalculator={handleTypeCalculator}
        handleSurrender={handleSurrender}
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
        {showCatchPrompt && (
          <div className="catch-prompt">
            <button onClick={handleCatch}>예</button>
            <button
              onClick={() => {
                setShowCatchPrompt(false);
                setRecovered(true);
              }}
            >
              아니오
            </button>
          </div>
        )}
        {showReplacePrompt && (
          <div className="pokemon-list">
            {selectedPokemonData.map((pokemon) => (
              <button key={pokemon.id} onClick={() => handleReplace(pokemon)}>
                {pokemon.koreanName}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonBattle;
