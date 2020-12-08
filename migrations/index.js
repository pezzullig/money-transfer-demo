import PostgresMigrations from 'postgres-migrations';

import Db from '../db';

// Note that this is relative to the top-level module (`moneytransfer`) rather than this directory.
const MIGRATIONS_DIRECTORY = './migrations/sql';

// Start up the database pool
Db.initPool();

// Run the migrations.  Can't use await at the top level
PostgresMigrations.migrate({ client: Db.pool() }, MIGRATIONS_DIRECTORY)
  .then(() => {
    console.log('Finished migrations');
    process.exit(0);
  }, (e) => {
    console.error('Error running migrations: ', e);
    process.exit(1);
  });
