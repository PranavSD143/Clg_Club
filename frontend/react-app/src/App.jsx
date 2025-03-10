import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Clubs from "./Pages/Clubs";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Textbox from "./components/textbox";
import List from "./components/List";
import Form from "./components/form";
import ClubPage from "./Pages/Club_page";
import NoPage from "./Pages/NoPage";
import ClubCreation from "./Pages/club_creation";
import Blank from "./components/Card";

function TextboxWrapper({ authenticated }) {
  const { id } = useParams(); // Retrieve the ID here
  return authenticated ? <Textbox register={id} /> : <NoPage />;
}

function FormWrapper({ authenticated }) {
  const { id } = useParams();
  return authenticated ? <Form existing={id} /> : <NoPage />;
}

export default function App() {
  const [authenticated, authenticate] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blank" element={<Blank />} />
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route
          path="/adminPage"
          element={<Login isAuthenticated={authenticate} />}
        />
        <Route
          path="/textbox/:id"
          element={<TextboxWrapper authenticated={authenticated} />}
        />

        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="*" element={<NoPage />} />
        <Route
          path="/club_creation"
          element={
            authenticated ? (
              <ClubCreation />
            ) : (
              <Login isAuthenticated={authenticate} />
            )
          }
        />
        <Route path="/list" element={authenticated ? <List /> : <NoPage />} />
        <Route
          path="/form/:id"
          element={<FormWrapper authenticated={authenticated} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
