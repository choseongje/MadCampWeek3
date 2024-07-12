import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SelectedPokemon from "./pages/SelectedPokemon";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/selected-pokemon" element={<SelectedPokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
