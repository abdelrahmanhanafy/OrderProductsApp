const Sequelize = require('sequelize');
const db = require('../Config/database');

const User = db.define(
  'User',
  {
    // Model attributes are defined here
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(1234),
      allowNull: false,
    },
    balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Users',
  }
);
console.log(User === db.models.User); // true

module.exports = User;
