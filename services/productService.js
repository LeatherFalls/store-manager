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

const updateProducts = async (product) => productModel.updateProducts(product);

const deleteProducts = async (id) => {
  const product = productModel.getProductsById(id);

  if (!product) return false;

  await productModel.deleteProducts(id);
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};