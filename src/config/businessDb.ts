import mysql from "mysql2/promise";

const businessPool = mysql.createPool({
  host: process.env.BUSINESS_DB_HOST,
  user: process.env.BUSINESS_DB_USER,
  password: process.env.BUSINESS_DB_PASS,
  database: process.env.BUSINESS_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default businessPool;