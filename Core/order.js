const Sequelize = require('sequelize');
const db = require('../Config/database');
const User = require('./user');

const Order = db.define(
  'Order',
  {
    // Model attributes are defined here
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Processed',
      allowNull: false,
    },
  },
  {
    tableName: 'Orders',
  }
);

module.exports = Order;
