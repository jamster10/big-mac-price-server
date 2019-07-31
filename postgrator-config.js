// if don't need postgres or msql'/
// delete this file, migrate script, migrations folder
// uninstall pg and most likely knex
// to run migrations: NODE_ENV=<env> npm run migrate
'use strict';

const dotenv = require('dotenv');
let envFile;
if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
} else {
  envFile = '.env';
}

dotenv.config({ path: envFile });

module.exports = {
  'migrationDirectory': 'migrations',
  'driver': 'pg',
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'database': process.env.DB_NAME,
  'username': process.env.DB_USER,
  'password': process.env.DB_PASSWORD || '',
  'ssl': true
};