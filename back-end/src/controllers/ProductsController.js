const ProductService = require('../services/ProductService');

const getAllProducts = async (_req, res) => {
    const products = await ProductService.getAllProducts();
    return res.status(200).json(products);
   };

const createProduct = async (req, res) => {
    const { name, price, url_image, imageAlt } = req.body;
    const product = await ProductService.createProduct(name, price, url_image, imageAlt);
    return res.status(201).json(product);
  }; 

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    return res.status(204).json();
  };

 module.exports = {
   getAllProducts,
   createProduct,
   deleteProduct,
};