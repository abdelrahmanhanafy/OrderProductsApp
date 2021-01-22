const Sequelize = require('sequelize');
const db = require('../Config/database');
const Order = require('./order');
const Product = require('./product');

const OrderItems = db.define(
  'OrderItems',
  {
    // Model attributes are defined here
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(7, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'OrderItems',
  }
);
console.log(Order === db.models.Order); // true

Order.belongsToMany(Product, { through: OrderItems });
Product.belongsToMany(Order, { through: OrderItems });

module.exports = OrderItems;
