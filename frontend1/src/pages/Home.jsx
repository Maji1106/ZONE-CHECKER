// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // ตรวจสอบว่าเส้นทางนำเข้าถูกต้อง
import axios from 'axios';

const Home = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stores', {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ไปใน headers
          },
        });
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    if (token) { // ตรวจสอบว่ามี token ก่อนที่จะเรียก API
      fetchStores();
    }
  }, [token]);

  return (
    <div>
      <Navbar />
      <h1>หน้าหลัก</h1>
    </div>
  );
};

export default Home;
