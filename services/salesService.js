const salesModel = require('../models/salesModel');

const getSales = async () => salesModel.getSales();

const getSalesById = async (id) => {
  const saleFound = await salesModel.getSalesById(id);

  if (!saleFound) return false;

  return saleFound;
};

const getSaleProductById = async (id) => {
  const saleFound = await salesModel.getSaleProductById(id);

  if (!saleFound) return false;

  return saleFound;
};

const createSale = async () => {
  const saleId = await salesModel.createSale();
  
  return saleId;
};

const updateSale = async (sale) => {
  const updatedSale = await salesModel.updateSale(sale);

/*   const { saleId, productId, quantity } = updatedSale;

  const updatedResult = {
    saleId,
    itemsUpdated: [
      {
        productId,
        quantity,
      },
    ],
  }; */

  return updatedSale;
};

const deleteSale = async (id) => salesModel.deleteSale(id);

module.exports = {
  getSales,
  getSalesById,
  getSaleProductById,
  createSale,
  deleteSale,
  updateSale,
};