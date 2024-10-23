// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  // State สำหรับเก็บข้อมูลที่ผู้ใช้ป้อน
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทางหลังจากเข้าสู่ระบบสำเร็จ
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการเข้าสู่ระบบ
  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อฟอร์มถูกส่ง
    try {
      // ส่งคำขอไปยัง API สำหรับการเข้าสู่ระบบ
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.status === 200) {
        setToken(response.data.token); // เก็บ token ที่ได้รับ
        // แสดงสัญญาณความสำเร็จ
        Swal.fire({
          title: 'Success',
          text: 'Login successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // เปลี่ยนเส้นทางไปหน้าแรก
          navigate('/'); 
        });
      }
    } catch (error) {
      // แสดงข้อความแสดงข้อผิดพลาด
      Swal.fire({
        title: 'Error',
        text: 'Login failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
