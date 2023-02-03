const express = require('express');
const productsController = require('../controllers/ProductsController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');

const router = express.Router();

router
  .get('/customer/products', 
  productsController.getAllProducts)
  .post('/admin/products',
  TokenMiddleware.validateAdmin,
  productsController.createProduct)
  .delete('/admin/products/:id',
  TokenMiddleware.validateAdmin,
  productsController.deleteProduct);

module.exports = router;