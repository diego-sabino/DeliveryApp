const express = require('express');
const productsController = require('../controllers/ProductsController');

const router = express.Router();

router
  .get('/customer/products', 
  productsController.getAllProducts);

module.exports = router;