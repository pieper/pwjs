/**
 * HTTP handlers/middlewares/etc
 */

module.exports = Handler;

var WebTorrent = require('webtorrent');
var path = require('path');

function Handler () {};

Handler.prototype.general = function (req, res) {
  res.render('shared/layout.html');
};

/**
 * /pw/route.js file that contains routes and instructions to
 * load partials from torrent uris
 */
Handler.prototype.routes = function (req, res) {
  var routes = this.route.get();
  var output = 'window.pwroutes = ' + JSON.stringify(routes);

  res.setHeader('content-type', 'text/javascript');
  res.end(output);
};
