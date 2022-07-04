const express = require('express');

const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  salesController.getSales,
);

salesRouter.get(
  '/:id',
  salesController.getSalesById,
);

salesRouter.post(
  '/',
  salesController.createSale,
);

module.exports = salesRouter;