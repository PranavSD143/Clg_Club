import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Clubs from "./Pages/Clubs";
import Header from "./components/Header.jsx";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Textbox from "./components/textbox";
import List from "./components/List";
import Form from "./components/form";
import ClubPage from "./Pages/Club_page";
import NoPage from "./Pages/NoPage";
import ClubCreation from "./Pages/club_creation";
import Blank from "./components/Card";
import Footer from "./components/Footer";

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
  const logout = async () => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data.status == "Success") authenticate(false);
    else alert("Failed to logout");
  };

  useEffect(() => {
    async function authentication() {
      const response = await fetch("http://localhost:5000/authenticate", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.status == "success") {
        authenticate(true);
      } else authenticate(false);
    }
    authentication();
  }, [authenticated]);

  return (
    <BrowserRouter>
      <Header log={logout} auth={authenticated} />
      <Routes>
        <Route path="/blank" element={<Blank />} />
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route
          path="/adminPage"
          element={
            !authenticated ? <Login isAuthenticated={authenticate} /> : <List />
          }
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
        <Route path="/logout" element={!authenticated ? <Home /> : <List />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
