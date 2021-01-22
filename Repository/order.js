const Order = require('../Core/order');
const OrderItems = require('../Core/orderItems');
const { Op } = require('sequelize');
const User = require('../Core/user');
const Product = require('../Core/product');

module.exports = class OrderRepo {
  async createOrder({ userId }) {
    const order = await Order.create({ UserId: userId });
    return order.toJSON();
  }
  async createOrderItems(products) {
    const orderItems = await OrderItems.bulkCreate(products);
    return orderItems;
  }
  async getPreviousOrders({ offset, limit, userId }) {
    const options = {
      where: {
        UserId: {
          [Op.eq]: userId,
        },
      },
      offset: parseInt(offset) || 0,
      limit: parseInt(limit) || 10,
      include: [
        {
          model: Product,
          as: 'Products',
          attributes: ['id', 'name', 'category', 'brand', 'price'],
        },
      ],
    };
    const { count, rows } = await Order.findAndCountAll(options);
    return { count, rows };
  }

  async getOrder({ userId, orderId }) {
    const options = {
      where: {
        UserId: {
          [Op.eq]: userId,
        },
        id: {
          [Op.eq]: orderId,
        },
      },
    };
    const order = await Order.findOne(options);
    return order;
  }

  async cancelOrder(order) {
    const canceledOrder = await order.save();
    return canceledOrder;
  }
};
