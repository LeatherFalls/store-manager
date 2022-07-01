const express = require('express');

const productController = require('../controllers/productController');

const validateSchema = require('../middlewares/validateSchema');

const productsSchema = require('../schemas/productsSchema');

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
  validateSchema(productsSchema),
  productController.createProducts,
);

module.exports = productRouter;