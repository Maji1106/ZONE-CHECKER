// models/store.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const Store = sequelize.define('Store', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direction: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lat: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  lng: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  radius: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Store;
