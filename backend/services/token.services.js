// services/token.services.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tokens'; // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง

// ดึงข้อมูล token ทั้งหมด
const getAllTokens = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw error;
  }
};

// สร้าง token ใหม่
const createToken = async (tokenData, token) => {
  try {
    const response = await axios.post(API_URL, tokenData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};

// อัปเดต token โดย ID
const updateToken = async (id, tokenData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tokenData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating token:", error);
    throw error;
  }
};

// ลบ token โดย ID
const deleteToken = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting token:", error);
    throw error;
  }
};

export default {
  getAllTokens,
  createToken,
  updateToken,
  deleteToken
};
