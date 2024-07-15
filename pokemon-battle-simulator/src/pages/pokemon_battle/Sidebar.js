import React from "react";

const Sidebar = ({ showSidebar, toggleSidebar, handleTypeCalculator }) => {
  return (
    <div className={`sidebar ${showSidebar ? "active" : ""}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        메뉴
      </button>
      <button className="sidebar-item" onClick={handleTypeCalculator}>
        타입 상성 계산기
      </button>
    </div>
  );
};

export default Sidebar;
