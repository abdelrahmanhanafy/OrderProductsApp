const Sequelize = require('sequelize');
const db = require('../Config/database');
const Order = require('./order');

const User = db.define(
  'User',
  {
    // Model attributes are defined here
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: true,
      len: [3, 10],
      validate: {
        notNull: { msg: 'User must have an email' },
        notEmpty: { msg: 'User must not be empty ' },
        isEmail: { msg: 'Must be a valid email address' },
      },
    },
    password: {
      type: Sequelize.STRING(1234),
      allowNull: false,
    },
    balance: {
      type: Sequelize.DECIMAL(7, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Users',
  }
);
console.log(User === db.models.User); // true

User.hasMany(Order);
Order.belongsTo(User);

module.exports = User;
