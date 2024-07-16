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
  const [selectedPokemonData, setSelectedPokemonData] = useState([]);
  const [opponentHp, setOpponentHp] = useState(0);
  const [selectedHp, setSelectedHp] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState("");
  const [showSwitchPrompt, setShowSwitchPrompt] = useState(false);
  const [showPokemonSelect, setShowPokemonSelect] = useState(false);
  const [availablePokemon, setAvailablePokemon] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [pokemonRounds, setPokemonRounds] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTypeCalculator, setShowTypeCalculator] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [beingAttacked, setBeingAttacked] = useState(false);
  const [opponentAttacking, setOpponentAttacking] = useState(false);
  const [opponentBeingAttacked, setOpponentBeingAttacked] = useState(false);
  const [isRoundStart, setIsRoundStart] = useState(true); // 라운드 시작 시 교체 여부 판단
  const [faintedPokemonIds, setFaintedPokemonIds] = useState([]); // 기절한 포켓몬 ID 목록
  const [roundFaintedPokemonIds, setRoundFaintedPokemonIds] = useState([]); // '그 라운드'에서 쓰러진 포켓몬 ID 목록

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
    setIsRoundStart(true); // 라운드 시작 교체 여부 설정
    setRoundFaintedPokemonIds([]); // 새로운 라운드가 시작될 때마다 라운드 기절 포켓몬 목록 초기화
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
    setAvailablePokemon(dataWithKoreanNames.slice(0));
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
    if (opponentPokemon && selectedPokemonData.length > 0) {
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
                const evolvablePokemon = selectedPokemonData.filter(
                  (pokemon) => {
                    const evolution = evolutionData.find(
                      (e) => e.id === pokemon.id
                    );
                    return evolution && pokemonRounds[pokemon.id] >= 10;
                  }
                );

                // 진화할 수 있는 포켓몬이 있을 경우 진화 페이지로 이동
                if (evolvablePokemon.length > 0) {
                  navigate("/evolution", {
                    state: {
                      selectedPokemon: selectedPokemonData,
                      round: round + 1,
                      pokemonRounds,
                    },
                  });
                } else {
                  // 모든 포켓몬의 HP를 회복하고 다음 라운드로 진행
                  recoverAllPokemon();
                  setShowPokemonSelect(false);
                  setShowSwitchPrompt(true);
                  setShowTypeSelect(false);
                  setRound((prevRound) => prevRound + 1);
                  fetchOpponentPokemon();
                }
              }, 1000);
            } else {
              // 상대 포켓몬이 쓰러지지 않았을 경우 상대 포켓몬의 공격 실행
              setTimeout(() => {
                opponentAttack();
              }, 500);
            }
            return newHp;
          });
        }, 500);
      }, 500);
    }
  };

  const recoverAllPokemon = () => {
    // 모든 포켓몬의 체력을 최대 체력으로 회복시킴
    const recoveredPokemon = allPokemonData.map((pokemon) => ({
      ...pokemon,
      currentHp: getPokemonMaxHp(pokemon),
    }));
    // 회복된 포켓몬 데이터로 상태 업데이트
    setAllPokemonData(recoveredPokemon);
    // 모든 포켓몬을 사용 가능한 포켓몬 목록에 포함시킴
    setAvailablePokemon(recoveredPokemon);
    // 현재 선택된 포켓몬의 체력을 최대 체력으로 설정
    setSelectedHp(getPokemonMaxHp(selectedPokemonData[0]));
  };

  const handlePokemonSelect = async (pokemon) => {
    // 기존 선택된 포켓몬의 HP 업데이트
    const updatedPokemonList = selectedPokemonData.map((p) =>
      p.id === selectedPokemonData[0].id
        ? { ...selectedPokemonData[0], currentHp: selectedHp }
        : p
    );
  
    // 새로운 선택된 포켓몬의 데이터를 API에서 가져오기
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
    );
    const data = await response.json();
    const koreanName = unevolved.find((p) => p.id === pokemon.id).name;
    const newSelectedPokemon = {
      ...data,
      koreanName,
      currentHp: pokemon.currentHp, // 교체될 때의 HP를 유지
    };
  
    // 선택된 포켓몬 목록 업데이트
    setSelectedPokemonData(
      [newSelectedPokemon, ...updatedPokemonList.filter(p => p.id !== pokemon.id)]
    );
  
    // 새로 선택된 포켓몬의 HP 설정
    setSelectedHp(newSelectedPokemon.currentHp);
  
    // 사용 가능한 포켓몬 목록 업데이트 및 순서 변경
    const updatedAvailablePokemon = [newSelectedPokemon, ...availablePokemon.map((p) =>
      p.id === selectedPokemonData[0].id
        ? { ...selectedPokemonData[0], currentHp: selectedHp }
        : p
    ).filter((p) => p.id !== pokemon.id)];
  
    setAvailablePokemon(updatedAvailablePokemon);

    // 메시지 및 UI 업데이트
    setMessage(`가랏! ${newSelectedPokemon.koreanName}!`);
    setShowSwitchPrompt(false);
    setShowPokemonSelect(false);
    setShowTypeSelect(false);
  
    // 라운드 시작 시 교체와 공격 중 교체 구분
    if (isRoundStart) {
      setIsRoundStart(false);
      setMessage("공격 타입을 선택하세요:");
      setShowTypeSelect(true);
    } else {
      setTimeout(() => {
        opponentAttack();
      }, 1000);
    }
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

  const opponentAttack = () => {
    if (opponentPokemon && selectedPokemonData.length > 0) {
      const opponentAttack = getPokemonAttack(opponentPokemon);
      const opponentTypes = opponentPokemon.types.map((t) => t.type.name);
      const opponentType =
        opponentTypes[Math.floor(Math.random() * opponentTypes.length)];
      const defenderTypes = selectedPokemonData[0].types.map((t) => t.type.name);
      const opponentDamage = calculateDamage(
        opponentAttack,
        opponentType,
        defenderTypes
      );
      const opponentMultiplier = opponentDamage / opponentAttack;
  
      // 상대 포켓몬의 공격 메시지를 설정
      setMessage(
        `${opponentPokemon.koreanName}의 ${getTypeNameInKorean(opponentType)} 공격!`
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
              // 현재 배틀에 나와 있는 포켓몬이 쓰러진 것으로 설정
              const faintedPokemon = availablePokemon[0];
              setFaintedPokemonIds((prevIds) => [...prevIds, faintedPokemon.id]);
              setRoundFaintedPokemonIds((prevIds) => [
                ...prevIds,
                faintedPokemon.id,
              ]);
  
              // 쓰러진 포켓몬을 선택된 포켓몬 목록에서 제거
              setSelectedPokemonData((prevSelected) =>
                prevSelected.filter((pokemon) => pokemon.id !== faintedPokemon.id)
              );
  
              // 사용 가능한 포켓몬 목록 업데이트
              setAvailablePokemon((prevAvailable) =>
                prevAvailable.filter((pokemon) => pokemon.id !== faintedPokemon.id)
              );
  
              setShowPokemonSelect(true);
              setMessage("내 포켓몬이 쓰러졌습니다! 다음 포켓몬을 선택하세요.");
            } else {
              // 플레이어가 다음 공격 타입을 선택할 수 있도록 메시지를 설정
              setMessage("공격 타입을 선택하세요:");
              setShowTypeSelect(true);
            }
            return newHp;
          });
        }, 500);
      }, 500);
    }
  };  

  return (
    <div className="App">
      <h1>포켓몬 배틀 - 라운드 {round}</h1>
      {opponentPokemon && selectedPokemonData.length > 0 && (
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
      )}
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
        {showPokemonSelect && (
          <div className="pokemon-list">
            {availablePokemon.map((pokemon) => (
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
            <button onClick={() => handleSwitchDecision("yes")}>
              포켓몬 교체
            </button>
          </div>
        )}
      </div>
      {showSwitchPrompt && !showPokemonSelect && (
        <div className="switch-prompt-box">
          <div className="switch-prompt">
            <button onClick={() => handleSwitchDecision("yes")}>예</button>
            <button onClick={() => handleSwitchDecision("no")}>아니오</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonBattle;
