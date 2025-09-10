
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Supabase    // local DB does NOT need SSL
});

pool.on('connect', () => {
  console.log(`Database connected on ${process.env.DATABASE_URL}`);
});

module.exports = {
  pool,
  bcrypt
};
