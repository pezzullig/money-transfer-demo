# Money Transfer (Node.js)

This is a basic Node.js HTTP server to track users and their balances.  Your interviewer will explain the question to you; this README just contains usage hints.  It's intended to be used with Node 12 and above.

The main libraries used in this server are [Express](https://github.com/expressjs/express), an HTTP web framework, and [node-postgres](https://github.com/brianc/node-postgres), a PostgreSQL client.


## Getting Started

You should have received an environment check application that checked whether you have Node 12, Yarn, and Docker installed.  If you did not, please let your interviewer know that you did not receive the environment check, and install those dependencies now.

Next, make sure you do not have anything running on ports 5432 or 8080 (you'll need to shut down the environment check, because it uses these same ports).  Once you have done so, start the database with:
```bash
$ yarn db-start
```

Then, in a new shell, install Node dependencies, run migrations, and start the server with:
```bash
$ yarn install
$ yarn migrate
$ yarn start
```

You can see a test account with:
```bash
$ curl localhost:8080/accounts/1
{"data":{"id":1,"balance":123}}
```

Finally, you can get a PostgreSQL shell with:
```bash
$ yarn db-attach
```


## Migrations

Migrations are run via the [postgres-migrations](https://github.com/thomwright/postgres-migrations) module.  You can add new migrations in the `migrations/sql` directory with a `.sql` suffix, and you can run migrations with the `yarn migrate` command.


## Making Changes

Your interviewer will probably ask you to add a new endpoint.  You should start in `index.js`, but be aware that that file is purposely long and should probably be split up before you do much more in it.


## Node.JS notes

  - This project uses plain Node 12 with ECMAScript modules (without Babel).  You cannot use named imports from external modules in Node 12 - you have to do a default import and then reference the named import as a property on the default-imported object.  It is possible to use named imports from internal modules; the base code given here does not use them but you're free to use them if you want.
  - `eslint`, configured with AirBnB style (allowing `console.log()`), is provided for your convenience.  You can invoke it with `yarn lint`.
