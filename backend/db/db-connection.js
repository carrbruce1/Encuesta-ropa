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
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "FMfauIWqYFgVXMoqbqJJzQlIrVnKvRKK", 
  database: process.env.DB_NAME || "railway",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
