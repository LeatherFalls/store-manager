const express = require('express');

const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const salesRouter = express.Router();

salesRouter.post(
  '/',
  salesValidation.idValidation,
  salesValidation.quantityValidation,
  salesValidation.availableProduct,
  salesValidation.availableProducts,
  salesController.createSale,
);

salesRouter.get(
  '/',
  salesController.getSales,
);

salesRouter.get(
  '/:id',
  salesController.getSalesById,
);

module.exports = salesRouter;