const express = require('express');

const productController = require('../controllers/productController');
const validateName = require('../middlewares/productValidation');

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

productRouter.put(
  '/:id',
  validateName,
  productController.updateProducts,
);

productRouter.delete(
  '/:id',
  productController.deleteProducts,
);

module.exports = productRouter;