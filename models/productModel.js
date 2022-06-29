const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.products
  ORDER BY id ASC`);
  return result;
};

const getProductsById = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.products
  WHERE id = ?`,
    [id]);
  return result[0];
};

module.exports = {
  getProducts,
  getProductsById,
};