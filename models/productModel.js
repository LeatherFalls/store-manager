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
  console.log(result);
  return result[0];
};

const createProducts = async (product) => {
  const { name } = product;

  const [result] = await connection.execute(`
  INSERT INTO StoreManager.products
  (name) VALUES (?)`,
    [name]);
  return {
    id: result.insertId,
    name,
  };
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
};