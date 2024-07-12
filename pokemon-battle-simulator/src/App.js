import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PokemonBattle from "./pages/PokemonBattle";
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
          path="/pokemon-battle"
          element={isLoggedIn ? <PokemonBattle /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
