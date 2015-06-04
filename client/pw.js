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
      var route = window.pwroutes[i];

      page(route.path, handler);
    };

    page();
  };

  function handler () {
    console.log('here we go');
    console.log(this)
  };

  //start watching
  return {
    init: init
  };
}));
