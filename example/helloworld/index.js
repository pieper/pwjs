var Pw = require('../../index.js');
var express = require('express');

var app = new Pw();
app.get('/', 'home.html');
app.get('/home2', 'home2.html');

//expressjs settings
app.app.set('views', __dirname + '/views');
app.app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Pw is running');
});
