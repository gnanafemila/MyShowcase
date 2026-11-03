import React, { useState } from "react";
import axios from "axios";

function Register({ onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
  e.preventDefault();

  axios
    .post("http://10.109.75.125:5000/register", {
      name: name,
      email: email,
      password: password
    })
    .then((response) => {
      alert(response.data);
      onBack();
    })
    .catch((error) => {
      console.log(error);
      alert("Registration failed");
    });
};

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create Account</h1>

        <p>Start building your showcase</p>

        <form onSubmit={handleRegister}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Create Account</button>
        </form>

        <p>
          Already have an account?
          <button onClick={onBack}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;