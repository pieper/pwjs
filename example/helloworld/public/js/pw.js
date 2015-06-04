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
      var magnetUri = route.hash;

      console.log('start getting ' + magnetUri)
      client.add(magnetUri, function (torrent) {
        // Got torrent metadata!
        console.log('Torrent info hash:', torrent.infoHash)

        torrent.files.forEach(function (file) {
          // Get a url for each file
          file.getBlobURL(function (err, url) {
            if (err) throw err

              // Add a link to the page
              var a = document.createElement('a')
              a.download = file.name
              a.href = url
              a.textContent = 'Download ' + file.name
              document.body.appendChild(a)
          })
        })
      })
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
