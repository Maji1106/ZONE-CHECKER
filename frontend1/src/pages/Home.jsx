// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // ตรวจสอบว่าเส้นทางนำเข้าถูกต้อง
import axios from "axios";
import Map from "../components/Map"; // นำเข้าคอมโพเนนต์ Map

const Home = () => {
  const [token, setToken] = useState("");
  const [stores, setStores] = useState([]); // State สำหรับเก็บข้อมูลร้านค้า
  const [loading, setLoading] = useState(true); // State สำหรับสถานะการโหลด
  const [error, setError] = useState(null); // State สำหรับเก็บข้อผิดพลาด

  useEffect(() => {
    // รับ token จาก localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true); // ตั้งค่าการโหลดเป็น true ก่อนการเรียก API
      try {
        const response = await axios.get("http://localhost:5000/api/stores", {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ไปใน headers
          },
        });
        setStores(response.data); // ตั้งค่าร้านค้าที่ดึงมา
      } catch (error) {
        console.error("Error fetching stores:", error);
        setError("Failed to fetch stores."); // เก็บข้อผิดพลาด
      } finally {
        setLoading(false); // ตั้งค่าการโหลดเป็น false หลังจากเสร็จ
      }
    };

    if (token) {
      fetchStores();
    }
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4"></h1>
      <Map /> {/* เรียกใช้คอมโพเนนต์ Map ที่นี่ */}
      {loading && <p>Loading stores...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {stores.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">รายการร้านค้า</h2>
          <ul className="list-disc list-inside">
            {stores.map((store) => (
              <li key={store.id} className="my-2">
                {store.name} - {store.location}{" "}
                {/* แสดงชื่อและที่ตั้งร้านค้า */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
