/**
 * People-driven web.
 * Imagine a web, powered by clients.
 *
 * A weekend project by Afshin Mehrabani <afshin.meh@gmail.com>
 * MIT
 */


//export
module.exports = Pw;

//imports
var express = require('express');
var Route = require('./lib/route');
var Handler = require('./lib/handler');
var WebTorrent = require('webtorrent');
var path = require('path');
var debug = require('debug')('pw');
var Q = require('q');

function Pw (app) {
  this.app = express();

  //expressjs default setup
  this.app.engine('html', require('ejs').renderFile);
  this.app.use(express.static('public'));

  this.route = new Route();
  this.opts = {};
};

/**
 * Set options
 */
Pw.prototype.setOption = function (key, value) {
  this.opts[key] = value;
};

/**
 * Get option
 */
Pw.prototype.getOption = function (key) {
  return this.opts[key];
};

/**
 * Add a new route
 * GET method
 */
Pw.prototype.get = function (path, partial, opts) {
  this.route.add('GET', path, partial, opts);
};

/**
 * Listens on specific port and run the server
 */
Pw.prototype.listen = function (port, fn) {
  var self = this;
  var handler = new Handler();
  var routes = this.route.get();

  this.app.get('/pw/route.js', handler.routes.bind(this));
  this.app.get('*', handler.general.bind(this));

  var client = new WebTorrent();
  var promises = [];

  for (var i in routes) {
    var route = routes[i];
    var deferred = Q.defer();

    debug('requesting to seed "%s"', route.partial);

    (function (deferred, route) {
      client.seed(path.join(self.app.get('views'), route.partial), function (torrent) {
        debug('started seeding %s - %s', torrent.infoHash, torrent.files[0].name);
        self.route.addHash(route.path, torrent.infoHash);

        deferred.resolve(torrent);
      });
    }(deferred, route));

    promises.push(deferred.promise);
  };

  Q.all(promises).then(function () {
     debug('routes torrent are ready');
     debug('running webserver on port %s', port);
     self.app.listen(port, typeof (fn) == 'function' ? fn.bind() : null);
  });
};
