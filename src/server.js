'use strict';
const app = require('./app');
const { PORT, NODE_ENV, db } = require('./config');
const knex = require('knex');
const KnexQueryBuilder = require('knex/lib/query/builder');
require('./util/paginate-knex')(KnexQueryBuilder); //add a function to paginate Knex

//create connection to mysql database
const knexInstance = knex({
  client: 'mysql',
  connection: {
    host : db.HOST,
    user : db.USER,
    password : db.PASS,
    database : db.DB_NAME
  }
});

//attach db instance to global app
app.set('db', knexInstance);

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    console.log('Welcome to the MaTriX', 8080);
  }
});