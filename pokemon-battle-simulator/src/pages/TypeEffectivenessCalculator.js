import React, { useState } from "react";
import typeEffectiveness from "../data/typeEffectiveness";
import typeMapping from "../data/typeMapping";
import "../App.css";

const TypeEffectivenessCalculator = () => {
  const [attackType, setAttackType] = useState("");
  const [defenseType1, setDefenseType1] = useState("");
  const [defenseType2, setDefenseType2] = useState("");
  const [effectiveness, setEffectiveness] = useState(null);

  const types = Object.keys(typeEffectiveness);

  const calculateEffectiveness = () => {
    if (attackType && defenseType1) {
      let effectivenessValue1 =
        typeEffectiveness[attackType][defenseType1] !== undefined
          ? typeEffectiveness[attackType][defenseType1]
          : 1;
      let effectivenessValue2 = defenseType2
        ? typeEffectiveness[attackType][defenseType2] !== undefined
          ? typeEffectiveness[attackType][defenseType2]
          : 1
        : 1;

      const totalEffectiveness = effectivenessValue1 * effectivenessValue2;
      setEffectiveness(totalEffectiveness);
    }
  };

  const getTypeNameInKorean = (type) => typeMapping[type.toLowerCase()] || type;

  return (
    <div className="App">
      <div className="type-effectiveness-calculator">
        <h2>타입 상성 계산기</h2>
        <div className="form-group">
          <label>공격 타입:</label>
          <select
            value={attackType}
            onChange={(e) => setAttackType(e.target.value)}
          >
            <option value="">타입 선택</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeNameInKorean(type)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>방어 타입 1:</label>
          <select
            value={defenseType1}
            onChange={(e) => setDefenseType1(e.target.value)}
          >
            <option value="">타입 선택</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeNameInKorean(type)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>방어 타입 2 (선택):</label>
          <select
            value={defenseType2}
            onChange={(e) => setDefenseType2(e.target.value)}
          >
            <option value="">타입 선택</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeNameInKorean(type)}
              </option>
            ))}
          </select>
        </div>
        <button onClick={calculateEffectiveness}>계산하기</button>
        {effectiveness !== null && (
          <div className="result">효과는: {effectiveness}배 입니다.</div>
        )}
      </div>
    </div>
  );
};

export default TypeEffectivenessCalculator;
