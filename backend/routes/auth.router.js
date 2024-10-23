// routes/auth.router.js
const express = require('express');
const router = express.Router();

// ตัวอย่าง route สำหรับการ login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ใส่ logic สำหรับตรวจสอบ username และ password
  if (username === 'admin' && password === 'password') {
    res.json({ message: 'Login successful', token: 'exampleToken123' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
