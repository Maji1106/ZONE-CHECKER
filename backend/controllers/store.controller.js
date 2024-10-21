// controllers/store.controller.js
const Store = require('../models/store.model');

const createStore = async (req, res) => {
  try {
    const { name, adminId, address, direction, lat, lng, radius } = req.body;
    if (req.userId !== adminId) return res.status(403).json({ message: 'Unauthorized' });

    const newStore = await Store.create({ name, adminId, address, direction, lat, lng, radius });
    res.status(201).json({ message: 'Store created successfully', store: newStore });
  } catch (error) {
    res.status(500).json({ message: 'Error creating store', error: error.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll({ where: { adminId: req.userId } });
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error: error.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findOne({ where: { id: storeId, adminId: req.userId } });
    if (!store) return res.status(404).json({ message: 'Store not found' });

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching store', error: error.message });
  }
};

const updateStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const { name, adminId, address, direction, lat, lng, radius } = req.body;
    const store = await Store.findOne({ where: { id: storeId, adminId: req.userId } });
    if (!store) return res.status(404).json({ message: 'Store not found' });

    await store.update({ name, adminId, address, direction, lat, lng, radius });
    res.status(200).json({ message: 'Store updated successfully', store });
  } catch (error) {
    res.status(500).json({ message: 'Error updating store', error: error.message });
  }
};

const deleteStore = async (req, res) => {
  try {
    const storeId = req.params.id;
    const store = await Store.findOne({ where: { id: storeId, adminId: req.userId } });
    if (!store) return res.status(404).json({ message: 'Store not found' });

    await store.destroy();
    res.status(200).json({ message: 'Store deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting store', error: error.message });
  }
};

module.exports = { createStore, getAllStores, getStoreById, updateStore, deleteStore };
