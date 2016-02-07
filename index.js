var express = require('express');
var io = require('socket.io');
var app = express();

var port =  process.env.PORT || 80;
//app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html')
});

app.post('/', function (req, res) {
  //res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html')
});


app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});