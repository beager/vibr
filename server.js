var express = require('express'), http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/socket.html');
});

TailConsumer = require('./consumers/TailConsumer.js').TailConsumer;
GiantOctopusTailConsumer = require('./consumers/GiantOctopusTailConsumer.js').GiantOctopusTailConsumer;
OpenTSDBConsumer = require('./consumers/OpenTSDBConsumer.js').OpenTSDBConsumer;

/**
 * Tail Consumers
 */
new TailConsumer(io, {
	url: "/Users/bill/rsyslog/web-errors.log",
	eventName: 'web_errors'
});

new GiantOctopusTailConsumer(io, {
	url: "/Users/bill/scribe/user_registration_attempt/user_registration_attempt_current",
	eventName: 'user_registration_attempt',
	randomDelay: 30
});

new GiantOctopusTailConsumer(io, {
	url: "/Users/bill/scribe/act_search_page/act_search_page_current",
	eventName: 'sexy_search',
	randomDelay: 30,
	filter: function(data) {
		if (/sex/.test(data)) return true;
		return false;
	},
	randomDelay: 1000
});

/**
 * OpenTSDB Consumers
 */
new OpenTSDBConsumer(io, {
	metric: 'js_errors',
	eventName: 'js_errors'
});