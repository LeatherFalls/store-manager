const productModel = require('../models/productModel');

const salesService = require('../services/salesService');

const idValidation = async (req, res, next) => {
  const data = req.body;

  const checkId = await data.some((sale) => sale.productId === undefined);

  if (checkId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const quantityValidation = async (req, res, next) => {
  const data = req.body;

  const checkQuantity = await data.some((sale) => sale.quantity === undefined);

  const checkQuantityValue = await data.some((sale) => Number(sale.quantity) <= 0);

  if (checkQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (checkQuantityValue) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const availableProduct = async (req, res, next) => {
  const { productId } = req.body[0];

  const product = await productModel.getProductsById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const availableProducts = async (req, res, next) => {
  const data = req.body;

  await data.forEach(async (item) => {
    const product = await productModel.getProductsById(item.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  });

  next();
};

const saleExistenceValidation = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getSaleProductById(id);

  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  next();
};

module.exports = {
  idValidation,
  quantityValidation,
  availableProduct,
  availableProducts,
  saleExistenceValidation,
};