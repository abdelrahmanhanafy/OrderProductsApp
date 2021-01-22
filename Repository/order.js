const Order = require('../Core/order');
const OrderItems = require('../Core/orderItems');
const { Op } = require('sequelize');
const User = require('../Core/user');
const Product = require('../Core/product');

module.exports = class OrderRepo {
  async createOrder({ userId }) {

    //Create a single order in the database
    const order = await Order.create({ UserId: userId });
    return order.toJSON();
  }

  async createOrderItems(products) {

    //create the orderItems in the database...
    const orderItems = await OrderItems.bulkCreate(products);
    return orderItems;
  }

  async getPreviousOrders({ offset, limit, userId }) {

    //Apply the options for viewing previous orders of the user...
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

    //Specify the options for view single order
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

    //Cancel the order
    const canceledOrder = await order.save();
    return canceledOrder;
  }
};
