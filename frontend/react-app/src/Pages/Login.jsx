import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from "../components/List";
import LoginForm from "../components/login_form";

function Login() {
  const [loginSuccess, loggedIn] = useState(false);
  return (
    <div>
      <Header />
      {!loginSuccess ? <LoginForm status={loggedIn} /> : <List />}
      <Footer />
    </div>
  );
}

export default Login;
