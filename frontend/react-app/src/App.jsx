import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from "./Pages/Clubs";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
