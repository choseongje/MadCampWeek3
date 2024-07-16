import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PokemonBattle from "./pages/pokemon_battle/PokemonBattle";
import Evolution from "./pages/Evolution";
import SelectPokemon from "./pages/SelectPokemon";
import TypeEffectivenessCalculator from "./pages/TypeEffectivenessCalculator";
import GameOver from "./pages/GameOver";
import Pokedex from "./pages/pokedex/Pokedex";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/select-pokemon"
          element={isLoggedIn ? <SelectPokemon /> : <Navigate to="/login" />}
        />
        <Route
          path="/pokemon-battle"
          element={isLoggedIn ? <PokemonBattle /> : <Navigate to="/login" />}
        />
        <Route
          path="/evolution"
          element={isLoggedIn ? <Evolution /> : <Navigate to="/login" />}
        />
        <Route
          path="/type-calculator"
          element={
            isLoggedIn ? (
              <TypeEffectivenessCalculator />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/game-over"
          element={isLoggedIn ? <GameOver /> : <Navigate to="/login" />}
        />
        <Route
          path="/pokedex"
          element={isLoggedIn ? <Pokedex /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
