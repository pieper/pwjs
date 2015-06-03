/**
 * Router
 */

module.exports = Route;

function Route () {
  this.routes = [];
};

/**
 * Add a new route
 */
Route.prototype.add = function (method, path, partial) {
  this.routes.push({
    method: method,
    path: path,
    partial: partial,
    hash: null
  });
};

/**
 * Returns all routes
 */
Route.prototype.get = function () {
  return this.routes;
};

/**
 * Add info hash to a path
 */
Route.prototype.addHash = function (path, hash) {
  for (var i in this.routes) {
    var route = this.routes[i];

    if (route.path == path) {
      route.hash = hash;
      break;
    }
  };
};

/**
 * Converts `route` to string format
 */
Route.prototype.stringify = function () {
  return JSON.stringify(this.routes);
};
