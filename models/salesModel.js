const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.query(`
    SELECT
      sp.sale_id AS saleId, 
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY saleID ASC, productId ASC;
  `);

  return result;
};

const getSalesById = async (id) => {
  const [result] = await connection.query(`
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?;`,
    [id]);
  
  return result;
};

const getSaleProductById = async (id) => {
  const [result] = await connection.query(`
    SELECT sale_id FROM StoreManager.sales_products WHERE sale_id = ?
  `, [id]);

  console.log(result);

  return result;
};

const createSale = async () => {
  const [{ insertId }] = await connection.query(`
    INSERT INTO StoreManager.sales
    (date) VALUES (NOW());`);
  const fixId = insertId - 1;

  return fixId;
};

const insertSale = async (id, { productId, quantity }) => {
  await connection.query(`
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?);`,
    [id, productId, quantity]);
};

const updateSale = async (sale) => {
  const { quantity, saleId, productId } = sale;
  await connection.query(`
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId]);
  return sale;
};

const deleteSale = async (id) => {
  await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?`,
  [id]);
};

module.exports = {
  getSales,
  getSalesById,
  getSaleProductById,
  createSale,
  insertSale,
  deleteSale,
  updateSale,
};