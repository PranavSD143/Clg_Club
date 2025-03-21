import React, { useState } from "react";
import "../css/login_form.css";

function LoginForm({ status, authenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      status(true);
      authenticate(true);
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="loginForm" onSubmit={handleSubmit}>
      <form className="floating-form">
        <h2>Login</h2>
        <div className="input-group">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;

{
  /* <form className={loginForm.loginForm} onSubmit={handleSubmit}>
  <input
    type="email"
    placeholder="Email"
    name="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    name="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button type="submit">Login</button>
</form>; */
}
