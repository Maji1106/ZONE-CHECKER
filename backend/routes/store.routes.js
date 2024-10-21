// routes/store.routes.js
const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { createStore, getAllStores, getStoreById, updateStore, deleteStore } = require('../controllers/store.controller');
const router = express.Router();

router.post('/', verifyToken, createStore);
router.get('/', verifyToken, getAllStores);
router.get('/:id', verifyToken, getStoreById);
router.put('/:id', verifyToken, updateStore);
router.delete('/:id', verifyToken, deleteStore);

module.exports = router;
