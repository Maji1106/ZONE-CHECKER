// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zone', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
