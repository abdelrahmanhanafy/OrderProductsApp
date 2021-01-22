const express = require('express');

const ProductRepo = require('../../Repository/product');
const verifyToken = require('../../Helpers/verifyToken');
const Product = require('../../Core/product');

const productRepo = new ProductRepo();
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const { offset, limit, name, category, brand } = req.query;
    const { balance } = req.authUser;
    console.log({ offset, limit, name, category, brand });
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

router.post('/',  async (req, res) => {
  try {
    const {products} = req.body;
    //Create the products
    const items = await productRepo.createProducts(products);
    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
