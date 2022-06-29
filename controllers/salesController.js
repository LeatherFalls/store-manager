const salesService = require('../services/salesService');

const getSales = async (_req, res, next) => {
  try {
    const result = await salesService.getSales();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSalesById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await salesService.getSalesById(id);

    if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  getSalesById,
};