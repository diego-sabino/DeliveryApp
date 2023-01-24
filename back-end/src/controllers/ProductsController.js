const ProductService = require('../services/ProductService');

const getAllProducts = async (_req, res) => {
    const products = await ProductService.getAllProducts();
    return res.status(200).json(products);
   };

 module.exports = {
   getAllProducts,
};