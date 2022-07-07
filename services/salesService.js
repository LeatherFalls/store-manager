const salesModel = require('../models/salesModel');

const getSales = async () => salesModel.getSales();

const getSalesById = async (id) => {
  const saleFound = await salesModel.getSalesById(id);

  if (!saleFound) return false;

  return saleFound;
};

const createSale = async () => {
  const saleId = await salesModel.createSale();

  /* await Promise.all(sale.map((item) => salesModel.insertSale(saleId, item))); */
  
  return saleId;
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};