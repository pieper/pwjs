var Pw = require('../../index.js');

var app = new Pw();
app.get('/home', 'home.html');
app.get('/home2', 'home2.html');

app.listen(3000, function () {
  console.log('Pw is running on port 3000');
});
