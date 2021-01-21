const express = require('express');

const ProductRepo = require('../../Repository/product');
const product = require('../../Core/product');
const verifyToken = require('../../Helpers/verifyToken');

const productRepo = new ProductRepo();
const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
  try {
    const { offset, limit, name, category, brand } = req.query;
    const { balance } = req.authUser;
    const { count, rows } = await productRepo.getProducts(
      offset,
      limit,
      name,
      category,
      brand,
      balance
    );
    res.send({ 'Total Results Number Found': count, Products: rows });
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
