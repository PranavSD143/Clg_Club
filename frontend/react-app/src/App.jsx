import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from "./Pages/Clubs";
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";
import ClubPage from "./Pages/Club_page";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/admin" element={<Admin />} />
        {/* Dynamic Route for Entries */}
        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
