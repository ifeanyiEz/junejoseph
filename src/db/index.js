import { Pool } from "pg";
import config from '../config/index.js';

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Testing the connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    client.release();
  } catch (err) {
    console.error('PostgreSQL connection error', err);
    process.exit(1); // crash app if DB fails
  }
})();

export default pool;