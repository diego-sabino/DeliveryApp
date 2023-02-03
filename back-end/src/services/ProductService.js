const { products } = require('../database/models');
 
const getAllProducts = async () => {
  const product = await products.findAll();
  return product;
};

const createProduct = async (name, price, url_image, imageAlt) => {
  const product = await products.create({ name, price, url_image, imageAlt });
  return product;
};

const deleteProduct = async (id) => {
  await products.destroy({ where: { id } });
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
