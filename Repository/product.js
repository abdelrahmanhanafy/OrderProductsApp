const Product = require('../Core/product');
const { Op } = require('sequelize');

module.exports = class ProductRepo {
  async getProducts(offset, limit, name, category, brand, balance) {
    const options = {
      where: {
        price: { [Op.lte]: balance },
        name: { [Op.like]: `%${name ? name.trim() : ''}%` },
        brand: { [Op.like]: `%${brand ? brand.trim() : ''}%` },
        category: { [Op.like]: `%${category ? category.trim() : ''}%` },
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
    };
    const { count, rows } = await Product.findAndCountAll(options);
    return { count, rows };
  }
  async createProduct({ name, category, brand, price }) {
    const product = await Product.create({ name, category, brand, price });
    return product.toJSON();
  }
};
