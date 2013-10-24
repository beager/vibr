var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var latency = 120000; // 120s latency for now

Tail = require('tail').Tail;

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

tail = new Tail("/Users/bill/rsyslog/web-errors.log");

io.sockets.on('connection', function (socket) {
	tail.on("line", function(data) {
		var linedata = data.split(" ");
		var time = new Date().getTime();
		var log_time = Date.parse(linedata[0]);
		var delay = time - log_time;
		if (delay < 0 || delay > latency) return;

		var note = Math.floor((Math.random()*20)+20);
		var velocity = Math.floor((Math.random()*36)+36);

		var delay_random = Math.floor(Math.random()*1000);

		console.log('setting timeout for ' + delay);

		setTimeout(function(){
			socket.emit('note', {
				note: note,
				velocity: velocity,
				duration: 5
			});
		}, delay + delay_random);
	});
});