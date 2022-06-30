const productModel = require('../models/productModel');

const getProducts = async () => productModel.getProducts();

const getProductsById = async (id) => {
  const productFound = await productModel.getProductsById(id);

  if (!productFound) return false;

  return productFound;
};

const createProducts = async (product) => {
  const productCreated = await productModel.createProducts(product);

  return productCreated;
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
};