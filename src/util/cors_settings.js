'use strict';

const whitelist = ['http://localhost:3000', 'https://modest-turing-3f18c1.netlify.com'];

module.exports = function origin(origin, callback) {
  if (whitelist.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};
  
