import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from "./Pages/Clubs";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ClubPage from "./Pages/Club_page";
import NoPage from "./Pages/NoPage";
import ClubCreation from "./Pages/club_creation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/adminPage" element={<Login />} />
        {/* Dynamic Route for Entries */}
        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/club_creation" element={<ClubCreation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
