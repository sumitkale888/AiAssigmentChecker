require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({

  connectionString: process.env.DATABASE_URL, // for Heroku or other platforms
  ssl: { rejectUnauthorized: false } // required for Supabase
})
const bcrypt = require('bcrypt');
console.log(`Database connected on port ${process.env.DATABASE_URL}`)
module.exports= {
    pool,
    bcrypt
}