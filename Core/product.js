const Sequelize = require('sequelize');
const db = require('../Config/database');

const Product = db.define(
  'Product',
  {
    // Model attributes are defined here
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      len: [1, 20],
    },
    category: {
      type: Sequelize.STRING,
    },
    brand: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL(7, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'Products',
  }
);
console.log(Product === db.models.Product); // true

module.exports = Product;
