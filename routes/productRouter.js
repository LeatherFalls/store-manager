const express = require('express');

const productController = require('../controllers/productController');
const validateName = require('../middlewares/productValidation');

/* const validateSchema = require('../middlewares/validateSchema');

const productsSchema = require('../schemas/productsSchema'); */

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
  validateName,
  productController.createProducts,
);

module.exports = productRouter;