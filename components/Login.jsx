import React, { useState } from "react";
import axios from "axios";

function Login({ onRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://10.109.75.125:5000/login", {
        email: email,
        password: password
      })
      .then((response) => {
  if (response.data !== "Invalid email or password") {
    onLogin(response.data);
  } else {
    alert(response.data);
  }
})
      .catch((error) => {
        console.log(error);
        alert("Login failed");
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <div className="login-logo">
      <div className="logo-icon">🏆</div>
      <h1>MyShowcase</h1>
    </div>

        <p>One Link. Always Updated.</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?
          <button onClick={onRegister}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default Login;