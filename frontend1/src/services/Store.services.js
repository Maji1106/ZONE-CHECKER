// src/services/Store.services.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/stores"; // URL สำหรับการเชื่อมต่อกับ API

// ฟังก์ชันสำหรับการดึงข้อมูลร้านค้าทั้งหมด
const getAllStores = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // ใช้ token ในการยืนยันตัวตน
      },
    });
    return response.data; // คืนค่าข้อมูลร้านค้าจาก API
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error; // โยนข้อผิดพลาดกลับไปเพื่อให้สามารถจัดการได้ในที่เรียกใช้
  }
};

// ฟังก์ชันสำหรับสร้างร้านค้าใหม่
const createStore = async (storeData, token) => {
  try {
    const response = await axios.post(API_URL, storeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับการแก้ไขร้านค้า
const updateStore = async (id, storeData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, storeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
};

// ฟังก์ชันสำหรับลบร้านค้า
const deleteStore = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
};

// นำฟังก์ชันไปใช้ในส่วนอื่นๆ ของแอปพลิเคชัน
export default {
  getAllStores,
  createStore,
  updateStore,
  deleteStore,
};
