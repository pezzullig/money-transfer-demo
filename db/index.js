import Pg from 'pg';

import Config from '../config';

// Module to control database access.  Other modules can access the database
// by calling `import Db from 'db'; Db.pool().query();`.`

// Shared pool; initialized the first time it's needed
let pool;

// Initialize the pool.
const initPool = () => {
  if (pool) {
    console.log('Warning: Pool already initialized');
    return;
  }

  pool = new Pg.Pool(Config.database);
};

// Get the pool
const getPool = () => pool;

export default {
  initPool,
  pool: getPool,
};
