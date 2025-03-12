import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from "../components/List";
import LoginForm from "../components/login_form.jsx";

function Login({ isAuthenticated }) {
  const [loginSuccess, loggedIn] = useState(false);
  useEffect(() => {
    async function authentication() {
      const response = await fetch("http://localhost:5000/authenticate", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.status == "success") return true;
      return false;
    }
    authentication();
  }, []);
  return (
    <div>
      {/* <Header /> */}
      {!loginSuccess ? (
        <LoginForm status={loggedIn} authenticate={isAuthenticated} />
      ) : (
        <List />
      )}
      <Footer />
    </div>
  );
}

export default Login;
