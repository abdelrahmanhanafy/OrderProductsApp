const express = require('express');

const UserRouter = require('./Routes/User/index');
const ProductRouter = require('./Routes/Product/index');
const OrderRouter = require('./Routes/Order/index');

const router = express.Router();

// User Routes
router.use('/auth', UserRouter);

// Product Routes
router.use('/products', ProductRouter);

// Order Routes
router.use('/orders', OrderRouter);

module.exports = router;
