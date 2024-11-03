const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin); // ตรวจสอบให้แน่ใจว่ามีเส้นทางนี้

module.exports = router;
