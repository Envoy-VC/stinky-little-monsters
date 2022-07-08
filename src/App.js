import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mint" element={<Mint />} />
    </Routes>
  );
};

export default App;
