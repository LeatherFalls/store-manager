const salesModel = require('../models/salesModel');

const getSales = async () => salesModel.getSales();

const getSalesById = async (id) => {
  const saleFound = await salesModel.getSalesById(id);

  if (!saleFound) return false;

  return saleFound;
};

module.exports = {
  getSales,
  getSalesById,
};