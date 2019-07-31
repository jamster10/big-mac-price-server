'use strict';

//seems useful for postgres
const setDatabaseUrl = (env) => {
  if (env === 'production') {
    return process.env.DATABASE_URL; //change to production object connection
  } else if (env === 'development') {
    return process.env.DEV_DB_URL;//change to dev object connection
  } else {
    return process.env.TEST_DB_URL; //change to test object connection
  }
}; 

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  db: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
  }
};