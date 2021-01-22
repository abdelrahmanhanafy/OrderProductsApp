const express = require('express');
const schema = require('./schema');
const OrderRepo = require('../../Repository/order');
const verifyToken = require('../../Helpers/verifyToken');
const Order = require('../../Core/order');

const orderRepo = new OrderRepo();
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  try {

    //Retrieve the user object form the request... 
    const user = req.authUser;

    //Get the products from the request body...
    const products = req.body;

    //Create the order
    const order = await orderRepo.createOrder({ userId: user.id });

    //Prepare the items to be created in the orderItems table...
    const items = products.map((product) => {
      return {
        ProductId: product.id,
        OrderId: order.id,
        price: product.price,
        quantity: product.quantity,
      };
    });

    //Create the orderItems...
    const orderItems = await orderRepo.createOrderItems(items);
    res.send(orderItems);

  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {

    //Get the offset and the limit for pagination...
    const { offset, limit } = req.query;

    //Get the user id from the user object in the request...
    const { id } = req.authUser;

    //Get the previous orders of the user...
    const { count, rows } = await orderRepo.getPreviousOrders({ offset, limit, userId: id });

    res.send({ previousOrders: rows });

  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});
router.post('/cancel/:orderId', verifyToken, async (req, res) => {
  try {

    //Get the orderId from the request that will be canceled...
    const { orderId } = req.params;

    //Get the user id from the user object in the request...
    const { id } = req.authUser;

    //Retrieve the specific order with the id...
    const order = await orderRepo.getOrder({ userId: id, orderId });

    //Check that thhe order is existed...
    if (!order) return res.status(400).send('No order found with this id');

    //Check if the order is already canceled...
    if (order.status === 'Canceled') return res.status(400).send('Order is already canceled');

    //Cancel the order if it isn't delivered...
    if (order.status != 'Delivered') {
      order.status = 'Canceled';
      const canceledOrder = await orderRepo.cancelOrder(order);

      res.send(canceledOrder);
    }
  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
