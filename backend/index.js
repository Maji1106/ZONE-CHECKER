// index.js
const express = require('express');
const storeRouter = require('./routes/store.router'); // ตรวจสอบว่าไฟล์นี้มีอยู่
const authRouter = require('./routes/auth.router'); // ตรวจสอบว่าไฟล์นี้มีอยู่

const app = express();
app.use(express.json());

app.use('/api/store', storeRouter);
app.use('/api/auth', authRouter);  // ใช้ router สำหรับ auth

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
