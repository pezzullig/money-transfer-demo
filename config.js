export default {
  // Note that database is the node-postgres config format.
  database: {
    host: 'localhost',
    port: 5432,
    user: 'interview_dbuser',
    password: 'pass',
    database: 'interview',
  },
  server: {
    port: 8080,
  },
};
