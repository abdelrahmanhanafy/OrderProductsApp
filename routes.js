const express = require('express');

const UserRouter = require('./Routes/User/index');
const ProductRouter = require('./Routes/Product/index');

const router = express.Router();

// User Routes
router.use('/auth', UserRouter);

// Product Routes
router.use('/products', ProductRouter);

module.exports = router;
