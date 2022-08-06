const productService = require('../services/productService');
const productModel = require('../models/productModel');

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

const updateProducts = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const parseId = Number(id);

  try {
    const product = await productModel.getProductsById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await productService.updateProducts({ id: parseId, name });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProducts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductsById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    await productService.deleteProducts(id);

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchByName = async (req, res, next) => {
  const { q } = req.query;

  try {
    if (!q) {
      const products = await productService.getProducts();

      return res.status(200).json(products);
    }

    const search = await productService.searchByName(q);

    return res.status(200).json(search);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
  searchByName,
};