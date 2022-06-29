const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(`
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
  const [result] = await connection.execute(`
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?`,
    [id]);
  return result;
};

module.exports = {
  getSales,
  getSalesById,
};