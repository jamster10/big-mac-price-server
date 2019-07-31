'use strict';


const fs = require('fs');
const { Pool, Client } = require('pg')
const copyFrom = require('pg-copy-streams').from;
const config = require('../src/config');

const pool = new Pool({
  user: 'postgres',
  host: config.db.HOST,
  database: 'big-mac-data',
  password: config.db.PASS,
  port: config.db.PORT,
});
// MIGRATION_DB_HOST=localhost
// MIGRATION_DB_PORT=5432
// MIGRATION_DB_NAME=big-mac-data
// MIGRATION_DB_USER=postgres

 
pool.connect(function(err, client, done) {


  const stream = client.query(copyFrom('COPY data FROM STDIN'));

  const fileStream = fs.createReadStream('./bigmacdata.csv');
  fileStream.on('error', done);
  stream.on('error', done);
  stream.on('end', done);
  fileStream.pipe(stream);
});