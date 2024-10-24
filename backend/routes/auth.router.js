// routes/auth.router.js
const express = require("express");
const router = express.Router();

// Route สำหรับการลงทะเบียน
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // logic สำหรับการบันทึกผู้ใช้
  res.json({ message: "User registered successfully" });
});

module.exports = router;
