const connection = require('./connection');

const getProducts = async () => {
  const [result] = await connection.query(`
  SELECT * FROM StoreManager.products
  ORDER BY id ASC`);
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.query(`
  SELECT * FROM StoreManager.products
  WHERE id = ?`,
    [id]);
  return result;
};

const createProducts = async (product) => {
  const { name } = product;

  const [result] = await connection.query(`
  INSERT INTO StoreManager.products
  (name) VALUES (?)`,
    [name]);
  return {
    id: result.insertId,
    name,
  };
};

const updateProducts = async (product) => {
  const { id, name } = product;

  await connection.query(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [id, name]);
  return product;
};

const deleteProducts = async (id) => {
  await connection.query(`
  DELETE FROM StoreManager.products
  WHERE id = ?`,
    [id]);
};

module.exports = {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
};