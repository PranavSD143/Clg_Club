import React, { useState, useEffect } from "react";
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

// export default async function Authentication({ children }) {
//   const response = await fetch("http://localhost:5000/authenticate", {
//     method: "GET",
//     credentials: "include",
//   });
//   const result = await response.json();
//   console.log(result);
//   return result.status == "success" ? children[0] : children[1];
// }

export default function App() {
  // const [authenticated, authenticate] = useState(false);
  // useEffect(() => {
  //   console.log(authenticated);
  //   async function authentication() {
  //     const response = await fetch("http://localhost:5000/authenticate", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const result = await response.json();
  //     console.log(result);
  //     if (result.status == "success") {
  //       authenticate(true);
  //     } else authenticate(false);
  //   }
  //   authentication();
  // }, [authenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blank" element={<Blank />} />
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route
          path="/adminPage"
          element={
            <Authentication>
              <Login isAuthenticated={authenticate} /> <List />
            </Authentication>
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
            <Authentication>
              <ClubCreation />
              <Login isAuthenticated={authenticate} />
            </Authentication>
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
