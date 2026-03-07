// import { Pool } from "pg";
// import config from '../config/index.js';

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
//   port: config.db.port,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });

// // Testing the connection
// (async () => {
//   try {
//     const client = await pool.connect();
//     console.log('Connected to PostgreSQL');
//     client.release();
//   } catch (err) {
//     console.error('PostgreSQL connection error', err);
//     process.exit(1); // crash app if DB fails
//   }
// })();

// export default pool;

import pkg from "pg";
const { Pool } = pkg;
import config from '../config/index.js';

const poolConfig = config.db.connectionString 
    ? { 
        connectionString: config.db.connectionString,
        ssl: { rejectUnauthorized: false } 
      }
    : {
        user: config.db.user,
        host: config.db.host,
        database: config.db.database,
        password: config.db.password,
        port: config.db.port,
      };

const pool = new Pool(poolConfig);

// Testing the connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL on Render');
    client.release();
  } catch (err) {
    console.error('PostgreSQL connection error: Check your DATABASE_URL in Render Dashboard', err);
    // process.exit(1); // Optional: keep commented during debugging to see other logs
  }
})();

export default pool;