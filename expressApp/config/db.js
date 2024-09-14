const { Pool } = require('pg');
 
const pool = new Pool({
  user: 'database-user',
  password : 'dbu',
  host : 'localhost',
  port : 5432 , 
  database : 'products database'

});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;