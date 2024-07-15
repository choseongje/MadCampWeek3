import React from "react";
import TypeEffectivenessCalculator from "../TypeEffectivenessCalculator";

const TypeCalculatorOverlay = ({ setShowTypeCalculator }) => {
  return (
    <div className="type-calculator-overlay">
      <TypeEffectivenessCalculator />
      <button onClick={() => setShowTypeCalculator(false)}>닫기</button>
    </div>
  );
};

export default TypeCalculatorOverlay;
