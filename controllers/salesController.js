const salesService = require('../services/salesService');
const productService = require('../services/productService');

const getSales = async (_req, res, next) => {
  try {
    const result = await salesService.getSales();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await salesService.getSalesById(id);

    if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    await Promise.all(req.body.map(({ productId }) => productService.getProductsById(productId)));
    const id = await salesService.createSale(req.body);
    return res.status(201).json({ id, itemsSold: req.body });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};