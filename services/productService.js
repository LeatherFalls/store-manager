const productModel = require('../models/productModel');

const getProducts = async () => productModel.getProducts();

const getProductsById = async (id) => {
  const productFound = await productModel.getProductsById(id);

  if (!productFound) return false;

  return productFound;
};

const createProducts = async (product) => {
/*   const products = await productModel.getProducts();

  const checkIfExist = products.some(({ name }) => name === product.name);

  if (checkIfExist) return false; */

  const productCreated = await productModel.createProducts(product);

  return productCreated;
};

const updateProducts = async (product) => productModel.updateProducts(product);

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
};