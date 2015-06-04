(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.pw = factory();
  }
}(this, function () {

  function init () {
    if (typeof (window.pwroutes) != 'object') throw new Error('no pwroutes found.');

    for (var i in window.pwroutes) {
      page(window.pwroutes[i].path, handler);
    };

    page();
  };

  function handler (ctx) {
    var route = getRoute(ctx.path);

    if (route != null) {
      var client = new WebTorrent()
      var hash = route.hash;

      client.add(hash, function (torrent) {
        var file = torrent.files[0];

        file.getBuffer(function (err, buffer) {
          var container = document.querySelector('#container');
          container.innerHTML = buffer.toString();
        });
      });
    }
  };

  function getRoute (path) {
    for (var i in window.pwroutes) {
      var route = window.pwroutes[i];

      if (route.path == path) {
        return route;
        break;
      }
    };

    return null;
  };

  //start watching
  return {
    init: init
  };
}));
