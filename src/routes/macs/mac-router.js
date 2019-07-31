'use strict';

const express = require('express');
const macRouter = express.Router();
const MacService = require('./mac-service');
const macSchema = require('./mac-schema');

macRouter
  .route('/')
  .get( async (req, res, next) => {
    const { country } = req.query;
    
    //check if the country exists in the db
    const countryArray = req.app.get('countries');
    const db = req.app.get('db')
    const countryIndex = countryArray.findIndex(countryName => countryName.toLowerCase() === country.toLowerCase());

    if (countryIndex === -1) {
      return res.status(400).json({message: 'No data for given country'});
    }
    //grab a random country that's not the current one.
    const randomCountryIndex = randomizer(countryArray.length, countryIndex)
    
    try{
      //grab data from db and send it back
      const currentCountry = await MacService.getCountryData(db, country);
      const randomCountry = await MacService.getCountryData(db, countryArray[randomCountryIndex]);

      return res.status(200).json({
        currentCountry,
        randomCountry
      });
    } catch (e){
        //if there is a problem, log it. Also let the user know theres an error.
        next({status: 500, message: e.message});
    }
  })

  module.exports = macRouter;

  function randomizer(max, exclusion){
    const num = Math.floor(Math.random() * max) 
    return (num === exclusion) ? randomizer(max, exclusion) : num;
  }

  

  