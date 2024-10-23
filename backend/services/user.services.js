// services/user.services.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง

// ดึงข้อมูลผู้ใช้ทั้งหมด
const getAllUsers = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// ดึงข้อมูลผู้ใช้โดย ID
const getUserById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// เพิ่มผู้ใช้ใหม่
const createUser = async (userData, token) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// อัปเดตผู้ใช้โดย ID
const updateUser = async (id, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// ลบผู้ใช้โดย ID
const deleteUser = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
