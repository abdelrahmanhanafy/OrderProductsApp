const express = require('express');

const ProductRepo = require('../../Repository/product');
const verifyToken = require('../../Helpers/verifyToken');
const Product = require('../../Core/product');

const productRepo = new ProductRepo();
const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {

    //Get the required options for filtering and pagination...
    const { offset, limit, name, category, brand } = req.query;

    //Get the balance of the user to filter with...
    const { balance } = req.authUser;

    //Get the products filtered and paginated...
    const { count, rows } = await productRepo.getProducts(
      offset,
      limit,
      name,
      category,
      brand,
      balance
    );

    //Send the products to the user...
    res.send({ 'Total Results Number Found': count, Products: rows });
  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});

router.post('/',  async (req, res) => {
  try {

    //Get the items from the request body...
    const {products} = req.body;

    //Create the products
    const items = await productRepo.createProducts(products);
    
    res.send(items);
  } catch (err) {
    res.status(400).send(`Something went wrong`);
  }
});

module.exports = router;
