const express = require('express');
const SaleProductController = require('../controllers/SaleProductController');

const router = express.Router();

router
  .get('/salesProducts/:id', SaleProductController.getSalesById);

module.exports = router;
