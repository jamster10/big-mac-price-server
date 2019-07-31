'use strict';
const app = require('./app');
const { PORT, NODE_ENV, db } = require('./config');
const knex = require('knex');
const KnexQueryBuilder = require('knex/lib/query/builder');
require('./util/paginate-knex')(KnexQueryBuilder); //add a function to paginate Knex
const macService = require('../src/routes/macs/mac-service');


//create connection to mysql database
const knexInstance = knex({
  client: 'pg',
  connection: db.DB_URL
  
});
// console.log(knexInstance)



//attach country list array to app for easy use.
macService.getAllCountries(knexInstance)
  .then(countries =>{
    app.set('countries', countries);
  })
  .catch(e => {
    console.log(e);
    throw new Error('Unable to create country data. Check DB settings');
  });

//attach db instance to global app
app.set('db', knexInstance);

app.listen(PORT, () => {
  if (NODE_ENV !== 'production') {
    console.log('Welcome to the MaTriX', 8080);
  }
});