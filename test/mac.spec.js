/* global request, expect */
'use strict';
const app = require('../src/app');
const knex = require('knex');
const macService = require('../src/routes/macs/mac-service');
  

describe('mac endpoint works', () => {
  let db;

  before('Create DB connection', async () => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL
    });
    app.set('db', db);

    await macService.getAllCountries(db)
      .then(countries =>{
        app.set('countries', countries);
      })
      .catch(e => {
        console.log(e);
        throw new Error('Unable to create country data. Check DB settings');
      });
  });

  

  after('Disconnect from DB', () =>  db.destroy() );

  it('Handles a bad path', () => {
    return request(app)
      .get('/')
      .expect(404, {message:'Resource not Found'});
  });
  it('Handles a bad path', () => {
    return request(app)
      .post('/')
      .expect(404, {message:'Resource not Found'});
  });
  it('Handles a bad path', () => {
    return request(app)
      .post('/whatever')
      .expect(404, {message:'Resource not Found'});
  });
  it('Handles a bad request', () => {
    return request(app)
      .get('/mac')
      .query({country: null})
      .expect(400, {message: 'No data for given country'});
  });
  it('Handles a bad request', () => {
    return request(app)
      .get('/mac')
      .query({country: '5'})
      .expect(400, {message: 'No data for given country'});
  });
  it('Handles a country not in DB', () => {
    return request(app)
      .get('/mac')
      .query({country: 'Uganda'})
      .expect(400, {message: 'No data for given country'});
  });
  it('Handles a country in DB', () => {
    return request(app)
      .get('/mac')
      .query({country: 'United States'})
      .expect(200)
      .then(res => {
        expect(res.body.currentCountry)
        expect(res.body.randomCountry)
        expect(res.body.randomCountry.country).to.not.eql(res.body.currentCountry.country)
      })
  });
});