import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PokemonBattle from "./pages/PokemonBattle";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon-battle" element={<PokemonBattle />} />
      </Routes>
    </Router>
  );
}

export default App;
