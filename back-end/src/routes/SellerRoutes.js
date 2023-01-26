const express = require('express');
const sellerController = require('../controllers/SellerController');
const TokenMiddleware = require('../middlewares/TokenMiddleware');

const router = express.Router();

router
  .get('/seller', sellerController.getSeller)
  .post('/sales', TokenMiddleware.validateToken, sellerController.createSale)
  .get('/sales', sellerController.getSales)
  .get('/sales/:id', sellerController.getSalesById)
  .get('/seller/:id', sellerController.getSalesBySellerId)
  .get('/sellerName/:id', sellerController.getSellerById)
  .put('/sales/:id', sellerController.updateSaleStatus); 
  
module.exports = router;