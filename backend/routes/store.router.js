const express = require('express');
const router = express.Router();

// Define routes for store here
router.get('/', (req, res) => {
  res.send('Store API is working!');
});

module.exports = router;
