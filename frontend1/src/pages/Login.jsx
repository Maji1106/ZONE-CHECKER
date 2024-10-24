// src/pages/Login.jsx
import React, { useState } from "react";
import authService from "../services/auth.services"; // นำเข้า authService

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(username, password); // เรียกใช้ฟังก์ชัน login
      console.log("Login successful", data);
      // ทำอย่างไรต่อไป เช่น เก็บ token ไว้ใน localStorage หรือ redirect
    } catch (error) {
      setError(error.message); // เก็บข้อผิดพลาดไว้ใน state
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
