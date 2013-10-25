var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var latency = 120000; // 120s latency for now

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

TailConsumer = require('./consumers/TailConsumer.js').TailConsumer;
OpenTSDBConsumer = require('./consumers/OpenTSDBConsumer.js').OpenTSDBConsumer;

/**
 * Tail Consumers
 */
new TailConsumer(io, {
	url: "/Users/bill/rsyslog/web-errors.log",
	eventName: 'web_errors'
});

/**
 * OpenTSDB Consumers
 */
new OpenTSDBConsumer(io, {
	metric: 'js_errors',
	eventName: 'js_errors'
});