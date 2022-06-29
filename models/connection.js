const mysql2 = require('mysql2/promise');
require('dotenv').config();

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

module.exports = connection;