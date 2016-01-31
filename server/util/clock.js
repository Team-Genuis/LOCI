/**
 * Clock module.
 * @module util/clock
 */
var humanize = require('humanize-number');

/**
 * Create a point.
 * @param {Number} start - When the clock was started
 */
module.exports = {
  since: function(time) {
    var d = new Date - time;
    d = d < 10000 ? d + 'ms' : Math.round(d / 1000) + 's';
    return humanize(d);
  }
};
