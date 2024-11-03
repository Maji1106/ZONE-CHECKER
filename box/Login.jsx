// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios'; // นำเข้า axios สำหรับเรียก API

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        username,
        password,
      }); // เรียก API สำหรับการล็อกอิน
      console.log('Login successful', response.data);
      localStorage.setItem('token', response.data.accessToken); // เก็บ token ไว้ใน localStorage
      window.location.href = ''; // เปลี่ยนเส้นทางไปที่หน้าแดชบอร์ด
    } catch (error) {
      setError(error.response.data.message || error.message); // เก็บข้อผิดพลาดไว้ใน state
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
