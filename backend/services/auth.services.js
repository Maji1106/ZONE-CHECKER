// services/auth.services.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง

// ล็อกอินผู้ใช้
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// ลงทะเบียนผู้ใช้ใหม่
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// รับโปรไฟล์ผู้ใช้
const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export default {
  login,
  register,
  getProfile
};
