/* global request, expect */
'use strict';
const app = require('../src/app');

describe('booking endpoint works', () => {
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
});