var express = require('express');
var app = express();

var port =  process.env.PORT || 80;
//app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html')
});

app.post('/', function (req, res) {
  //res.send('Hello World!');
  res.sendfile(__dirname + '/public/index.html')
});


var server = app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});

var io = require('socket.io')(server);
io.on('connection', function (socket) {
  var addedUser = false;
  console.log('connected')

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('disconnect', function () {
  	console.log('disconnected')
  });
});