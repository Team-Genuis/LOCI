'use strict';
var path = require('path');
var clock = require('./util/clock.js');

var winston = require('winston'); // Logger
var serve = require('koa-static');
var mount = require('koa-mount');

var koa = require('koa.io');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = new winston.Logger({
  level: 'silly',
  transports: [
    new(winston.transports.Console)({
      colorize: 'all'
    })
  ]
});

logger.info('Creating loci server instance.');
var app = koa();

function myZeroes(rows, cols) {
  var array = [],
    row = [];
  while (cols--) row.push(0);
  while (rows--) array.push(row.slice());
  return array;
}
var playerVotes = myZeroes(5, 5);
var globalGrid = [];

function calcGrid(rows, cols) {
  for (let a = 0; a < rows; a++) {
    for (let b = 0; b < cols; b++) {
      globalGrid[[a, b]] = {
        owner: 1,
        type: "neutral"
      };
    }
  }
}
calcGrid(5, 5);
var locationSetA = [],
  locationSetB = [];
var cardVoteA = [],
  cardVoteB = [];

function voteSelectionA(x, y) {
  playerVotes[x][y]++;
  if (locationSetA.indexOf([x, y]) !== -1) {
    console.log('Server: new vote for A at ' + x + ' ' + y);
    locationSetA.push([x, y]);
  }
}

function voteSelectionB(x, y) {
  playerVotes[x][y]--;
  if (locationSetB.indexOf([x, y]) !== -1) {
    console.log('Server: new vote for B at ' + x + ' ' + y);
    locationSetB.push([x, y]);
  }
}

function cardSelectionA(cVote) {
  cardVoteA.push(cVote);
  console.log('Server: new vote for A: ' + cVote);
}

function cardSelectionB(cVote) {
  cardVoteB.push(cVote);
  console.log('Server: new vote for B: ' + cVote);
}

function modeForCards(array) {
  if (array.length === 0)
    return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] === null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

function voteInput(godVote, xVote, yVote, cardVote) {
  console.log('Server: Inputting vote');
  if (godVote === '1') {
    voteSelectionA(xVote, yVote);
    cardSelectionA(cardVote);
  } else {
    voteSelectionB(xVote, yVote);
    cardSelectionB(cardVote);
  }
}

function measureVotes() {
  console.log('Server: Measuring votes!');
}

var usernames = [];
var numUsers = 0;

var chatLog = '';
var chatLogCleaner = () => {
  if (chatLog.length > 1000) {
    chatLog = chatLog.slice(0, 1000);
  }
  setTimeout(chatLogCleaner, 30);
};
chatLogCleaner();
// middleware for connect and disconnect
app.io.use(function* userLeft(next) {
  // on connect
  logger.info('somebody connected');
  console.log('Server: somebody connected');
  logger.info(this.headers);
  console.log('wtfsdsdsdsd');
  this.emit('chatLog', chatLog);
  yield * next;
  // on disconnect
  if (this.addedUser) {
    delete usernames[this.username];
    --numUsers;

    // echo globally that this client has left
    this.broadcast.emit('user left', {
      username: this.username,
      numUsers: numUsers
    });
    console.log('wtfsdsdsdsd');
    this.emit('chatLog', chatLog);
  }
  logger.info('somebody left');
  console.log('Server: somebody left');
});

app.io.route('addPlayer', function(next, username) {
  this.username = username;
  usernames[username] = username;
  ++numUsers;
  this.addedUser = true;
  this.broadcast.emit('enter', {
    numUsers: numUsers
  });
  logger.info('Server: A player was added');
  console.log('Server: A player was added');
});

var actionRegex = /[1-2][a-e]{2} (Chapel|Tavern|Guild|Archive|Fort)/i;

//When client does an action, listen and broadcast
app.io.route('message', function(next, data) {
  logger.info('PRecieved: ', data);
  let messagePrefix = '';
  if (actionRegex.test(data.message)) {
    messagePrefix = 'ACTION>> ';
    this.broadcast.emit('playerAction', {
      username: this.username,
      message: data.message
    });
    this.emit('playerAction', {
      username: this.username,
      message: data.message
    });
    logger.info('Player action: ', data.message);
  } else {
    messagePrefix = 'Chat> ';
    this.broadcast.emit('chatMessage', {
      username: this.username,
      message: data.message
    });
    this.emit('chatMessage', {
      username: this.username,
      message: data.message
    });
    logger.info('Message: ', data.message);
  }
  chatLog = chatLog.concat(messagePrefix, data.message, '<br>');
  console.log(chatLog);
});

var docsRedirect = koa();

docsRedirect.use(function*(next) {
  yield next;
  this.status = 301;
  this.redirect('/docs/');
  this.body = 'Redirecting to docs cart';
});

// Serve the public
app
  .use(function*(next) {
    let start = new Date();
    yield next;
    logger.info('verbose', '%s %s - %s', this.method, this.url, clock.since(start, 'human'));
  })
  .use(mount('/', serve(path.resolve('tmp'))))
  .use(mount('/docs/', serve(path.resolve('docs'))))
  .use(mount('/docs', docsRedirect))
  .listen(8000, () => {
    logger.info('info', 'Listening at http://localhost:8000');
  });

module.exports = app; // for testing
