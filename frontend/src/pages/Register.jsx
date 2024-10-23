// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State สำหรับเก็บข้อมูลที่ผู้ใช้ป้อน
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  // ใช้ useNavigate สำหรับการเปลี่ยนเส้นทางหลังจากการลงทะเบียนสำเร็จ
  const navigate = useNavigate();

  // ฟังก์ชันจัดการการลงทะเบียน
  const handleRegister = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อฟอร์มถูกส่ง
    try {
      // ส่งคำขอไปยัง API สำหรับการลงทะเบียน
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        email
      });
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.status === 200) {
        // แสดงสัญญาณความสำเร็จ
        Swal.fire({
          title: 'Success',
          text: 'Registration successful!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // เปลี่ยนเส้นทางไปที่หน้า Login
          navigate('/login');
        });
      }
    } catch (error) {
      // แสดงข้อความแสดงข้อผิดพลาด
      Swal.fire({
        title: 'Error',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
