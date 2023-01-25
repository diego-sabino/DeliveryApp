const service = require('../services/seller.service');

const getSeller = async (req, res) => {
  const seller = await service.getSeller();
  return res.status(200).json(seller);
};

/* const createSale = async (req, res) => {
  const { body } = req;
  const sale = await service.createSale(body);
  return res.status(201).json(sale);
}; */

const getSales = async (req, res) => {
  const sales = await service.getSales();
  return res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await service.getSalesById(id);
  return res.status(200).json(sales);
};

const getSalesBySellerId = async (req, res) => {
  const { id } = req.params;
  const sales = await service.getSalesBySellerId(id);
  return res.status(200).json(sales);
};

const getSellerById = async (req, res) => {
  const { id } = req.params;
  const seller = await service.getSellerById(id);
  return res.status(200).json(seller);
};

const updateSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await service.updateSaleStatus(id, status);
  return res.status(200).json({ message: 'Status atualizado com sucesso' });
};

module.exports = {
  getSeller,
/*   createSale, */
  getSalesById,
  getSales,
  getSalesBySellerId,
  getSellerById,
  updateSaleStatus,
};
