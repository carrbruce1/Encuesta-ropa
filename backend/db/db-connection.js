// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'admin',
//   password: 'admin123',
//   database: 'encuestas_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// export default pool;


// backend/db-connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
