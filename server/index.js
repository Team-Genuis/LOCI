'use strict';
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
  var array = [], row = [];
  while (cols--) row.push(0);
  while (rows--) array.push(row.slice());
  return array;
}
var playerVotes = myZeroes(5,5);
var locationSetA = [], locationSetB = [];
var cardVoteA = [], cardVoteB = [];
function voteSelectionA(x, y) {
   playerVotes[x][y]++;
  if(locationSetA.indexOf([x,y]) != -1) {
    console.log('Server: new vote for A at '+x+' '+y);
    locationSetA.push([x,y]);
  }
}
function voteSelectionB(x,y) {
  playerVotes[x][y]--;
  if(locationSetB.indexOf([x,y]) != -1) {
    console.log('Server: new vote for B at '+x+' '+y);
    locationSetB.push([x,y]);
  }
}

function cardSelectionA(cVote) {
  cardVoteA.push(cVote);
  console.log('Server: new vote for A: '+cVote);
}
function cardSelectionB(cVote) {
  cardVoteB.push(cVote);
  console.log('Server: new vote for B: '+cVote);
}
function modeForCards(array)
{
  if(array.length == 0)
    return null;
  var modeMap = {};
  var maxEl = array[0], maxCount = 1;
  for(var i = 0; i < array.length; i++)
  {
    var el = array[i];
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}
function measureVotes(){
  console.log('Server: Measuring votes!');
}
// middleware for connect and disconnect
app.io.use(function* userLeft(next) {
  // on connect
  logger.info('somebody connected');
  console.log('Server: somebody connected');
  logger.info(this.headers);
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
  }
  logger.info('somebody left');
  console.log('Server: somebody left');
});

app.io.route('addPlayer', function*(next, username) {
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
app.io.route('message', function*(next, data) {
  logger.info('PRecieved: ', data);
<<<<<<< HEAD:server/index.js
  if (actionRegex.test(data.message)) {
=======
  if(actionRegex.test(data.message)){

>>>>>>> master:server.js
    this.broadcast.emit('playerAction', {
      username: this.username,
      message: data.message
    });
    this.emit('playerAction', {
      username: this.username,
      message: data.message
    });
    logger.info('Player action: ', data.message);
    var str = data.message;
    var godVote = str.charAt(0);
    var xVote = str.charAt(1).toLowerCase() - 97;
    var yVote = str.charAt(2).toLowerCase() - 97;
    var cardVote = actionRegex.exec(str);
    console.log("God:" + godVote + ", xVote: "+ xVote+", yVote"+yVote
        +", card: "+cardVote);
  } else {
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
});
// Serve the public
app
  .use(function*(next) {
    let start = new Date;
    yield next;
    logger.info('verbose', '%s %s - %s', this.method, this.url, clock.since(start, 'human'));
  })
  .use(mount('/', serve('tmp')))
  .use(mount('/docs', serve('docs')))
  .listen(8000, () => {
    logger.info('info', 'Listening at http://localhost:8000');
  });

module.exports = app; // for testing
