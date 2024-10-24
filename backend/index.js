// index.js
const express = require("express");
const cors = require("cors"); // นำเข้า cors
const authRouter = require("./routes/auth.router");

const app = express();

app.use(cors()); // ใช้งาน cors
app.use(express.json()); // เพื่อให้สามารถรับ JSON ใน body ได้
app.use("/api/auth", authRouter); // ใช้งาน authRouter

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
