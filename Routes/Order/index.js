const express = require('express');
const schema = require('./schema');
const OrderRepo = require('../../Repository/order');
const verifyToken = require('../../Helpers/verifyToken');
const Order = require('../../Core/order');

const orderRepo = new OrderRepo();
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {
    const user = req.authUser;
    const products = req.body;
    const amount = 0;
    //Create the order
    const order = await orderRepo.createOrder({ userId: user.id });
    const items = products.map((product) => {
      return {
        ProductId: product.id,
        OrderId: order.id,
        price: product.price,
        quantity: product.quantity,
      };
    });
    const orderItems = await orderRepo.createOrderItems(items);
    res.send(orderItems);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const { id } = req.authUser;
    const { count, rows } = await orderRepo.getPreviousOrders({ offset, limit, userId: id });
    res.send({ previousOrders: rows });
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});
router.post('/cancel/:orderId', verifyToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { id } = req.authUser;
    const order = await orderRepo.getOrder({ userId: id, orderId });
    if (!order) return res.status(400).send('No order found with this id');
    if (order.status === 'Canceled') return res.status(400).send('Order is already canceled');
    if (order.status != 'Delivered') {
      order.status = 'Canceled';
      const canceledOrder = await orderRepo.cancelOrder(order);
      res.send(canceledOrder);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
