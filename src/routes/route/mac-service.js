'use strict';

const xss = require('xss');

module.exports ={
  //get every country name
  getAllCountries(db){
    return db
      .distinct()
      .from('data')
      .pluck('country');
  },
  //get info for a single country
  getCountryData(db, country){
    return db
      .select('*')
      .from('data')
      .where({country})
      .orderBy('date', 'desc')
      .limit(1)
      .then(([data]) => this.sanitize(data));
  },
  //in case data is bad sanitize it
  sanitize(data){
    return {
      country: xss(data.country),
      local_price: xss(data.local_price),
      dollar_price: xss(data.dollar_price),
      dollar_ppp: xss(data.dollar_price),
    };
  }
};

