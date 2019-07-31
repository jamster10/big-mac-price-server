'use strict';
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//config files
const { errorHandler } = require('./util/error_handling');
const { cors_Settings } = require('./util/cors_settings');
const { morgan_settings } = require('./util/logging-winston_morgan');
const macRouter = require ('./routes/macs/mac-router');

const app = require('express')();

//set up middleware
app.use(morgan(morgan_settings));
app.use(cors(cors_Settings));
app.use(helmet());

//grab Country data

//set up route
app.use('/mac', macRouter);

//handle erroneous endpoints
app.use('*', (req, res, next) => {
  res.status(404).json({message: 'Resource not Found'});
});

//handle any internal errors
app.use(errorHandler);

module.exports = app;