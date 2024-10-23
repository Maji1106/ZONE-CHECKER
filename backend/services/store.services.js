// services/store.services.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stores'; // ตรวจสอบให้แน่ใจว่า URL ถูกต้อง

// ดึงข้อมูลร้านค้าทั้งหมด
const getAllStores = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};

// ดึงข้อมูลร้านค้าโดย ID
const getStoreById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching store by ID:", error);
    throw error;
  }
};

// เพิ่มร้านค้าใหม่
const createStore = async (storeData, token) => {
  try {
    const response = await axios.post(API_URL, storeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};

// อัปเดตร้านค้าโดย ID
const updateStore = async (id, storeData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, storeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
};

// ลบร้านค้าโดย ID
const deleteStore = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
};

export default {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
