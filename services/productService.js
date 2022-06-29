const productModel = require('../models/productModel');

const getProducts = async () => productModel.getProducts();

const getProductsById = async (id) => {
  const productFound = await productModel.getProductsById(id);

  if (!productFound) return false;

  return productFound;
};

module.exports = {
  getProducts,
  getProductsById,
};