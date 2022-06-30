const express = require('express');

const productController = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get(
  '/',
  productController.getProducts,
);

productRouter.get(
  '/:id',
  productController.getProductsById,
);

productRouter.post(
  '/',
  productController.createProducts,
);

module.exports = productRouter;