const productService = require('../services/productService');

const getProducts = async (_req, res, next) => {
  try {
    const result = await productService.getProducts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getProductsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await productService.getProductsById(id);

    if (!result) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createProducts = async (req, res, next) => {
  const { name } = req.body;

  try {
    const result = await productService.createProducts({ name });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
};