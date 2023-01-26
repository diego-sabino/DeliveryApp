const express = require('express');
const sellerController = require('../controllers/SellerController');
/* const isValidToken = require('../middlewares/validateToken'); */

const router = express.Router();

router
  .get('/seller', sellerController.getSeller)
  .post('/sales', /* isValidToken.validateAdmin, */ sellerController.createSale) 
  .get('/sales', sellerController.getSales)
  .get('/sales/:id', sellerController.getSalesById)
  .get('/seller/:id', sellerController.getSalesBySellerId)
  .get('/sellerName/:id', sellerController.getSellerById)
  .put('/sales/:id', sellerController.updateSaleStatus); 
  
module.exports = router;