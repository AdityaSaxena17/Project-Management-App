// const { Pool } = require('pg');
import pg from "pg";
import env from "dotenv"

// require('dotenv').config();
env.config();
// Create a new Pool instance for managing connections

console.log("abcd",process.env.DATABASE_URL);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});


// Export the db object so it can be used in other files

export default db