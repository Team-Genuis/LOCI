'use strict';
/*
var util = require('util');
var fs = require('fs');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var http = require('http');
var path = require('path');
var _ = require('lodash');
var feathersLogger = require('feathers-logger');
var Sequelize = require('sequelize');

var swaggerize = require('swaggerize-express');
var swaggerSequelize = require('./modules/swagger-sequelize');
var sequelizeService = require('feathers-sequelize');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
*/
var winston = require('winston');
var feathers = require('feathers');
var app = global.app = feathers();


// Serve public folder for everybody
app
  .use('/', feathers.static(__dirname + '/build'))
  .listen(8000, () => {
    winston.info('info', 'Your params are:', {
      foo: 'bar'
    });
  });


module.exports = app; // for testing
