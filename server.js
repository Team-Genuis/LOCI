'use strict';
var clock = require('./util/clock.js');

var winston = require('winston'); // Logger
var serve = require('koa-static');
var mount = require('koa-mount');

var koa = require('koa.io');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = new winston.Logger({
  level: 'verbose',
  transports: [
    new(winston.transports.Console)({
      colorize: 'all'
    })
  ]
});

logger.info('Creating loci server instance.');
var app = koa();

// middleware for connect and disconnect
app.io.use(function* userLeft(next) {
  // on connect
  logger.log('somebody connected');
  logger.log(this.headers);
  yield* next;
  // on disconnect
  if (this.addedUser) {
    delete usernames[this.username];
    --numUsers;

    // echo globally that this client has left
    this.broadcast.emit('user left', {
      username: this.username,
      numUsers: numUsers
    });
  }
  logger.log('somebody left');
});

// Serve the public
app
  .use(function*(next) {
    let start = new Date;
    yield next;
    logger.log('verbose', '%s %s - %s', this.method, this.url, clock.since(start, 'human'));
  })
  .use(mount('/', serve(__dirname + '/build')))
  .use(mount('/docs', serve(__dirname + '/docs')))
  .use(mount('/three', serve(__dirname + '/three')))
  .listen(8000, () => {
    logger.info('info', 'Listening at http://localhost:8000');
  });

module.exports = app; // for testing
