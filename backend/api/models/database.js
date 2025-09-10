// require('dotenv').config();
// const Pool = require('pg').Pool
// const pool = new Pool({

//   connectionString: process.env.DATABASE_URL, // for Heroku or other platforms
//   ssl: { rejectUnauthorized: false } // required for Supabase
// })
// const bcrypt = require('bcrypt');
// console.log(`Database connected on port ${process.env.DATABASE_URL}`)
// module.exports= {
//     pool,
//     bcrypt
// }
require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }  // only enable SSL for remote DBs
    : false,                          // local DB does NOT need SSL
});

pool.on('connect', () => {
  console.log(`Database connected on ${process.env.DATABASE_URL}`);
});

module.exports = {
  pool,
  bcrypt
};
