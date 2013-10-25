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
GrooveConsumer = require('./consumers/GrooveConsumer.js').GrooveConsumer;

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
	filter: function(data) {
		if (/sex/.test(data)) return true;
		return false;
	},
	randomDelay: 1000,
	minNote: 20,
	maxNote: 25
});

new GiantOctopusTailConsumer(io, {
	url: "/Users/bill/scribe/act_social/act_social_current",
	eventName: 'fan_mail',
	filter: function(data) {
		data = data.split("\t");
		if (data[1] == 40) return true;
		return false;
	},
	randomDelay: 1000,
	minVelocity: 10,
	maxVelocity: 20,
	minNote: 35,
	maxNote: 50
});

new GiantOctopusTailConsumer(io, {
	url: "/Users/bill/scribe/act_social/act_social_current",
	eventName: 'user_unfollow',
	filter: function(data) {
		data = data.split("\t");
		if (data[1] == 2 && data[7] == 'unfollow_iframe') return true;
		return false;
	},
	randomDelay: 15,
	minVelocity: 10,
	maxVelocity: 20,
	minNote: 10,
	maxNote: 20
});

new GiantOctopusTailConsumer(io, {
	url: "/Users/bill/scribe/soft_delete_user/soft_delete_user_current",
	eventName: 'soft_delete_user',
	processor: function(data) {
		var payload = {};

		var split = data.split("\t");
		// 2 = user ID
		// 4 = length correlates to more followed
		
		var max_user_id = 120000000; // yeah right
		var min_user_id = 0;

		var very_bitter_char = 1024;
		var bitter_len = split[4].length;

		if (bitter_len > very_bitter_char) bitter_len = 1024;

		var bitterness = Math.floor(bitter_len / very_bitter_char * 64) + 63;

		// sadness is the pitch
		var sadness = 20 - Math.floor(((max_user_id - split[2]) / max_user_id) * 20);

		payload.note = sadness;
		payload.velocity = bitterness;
		payload.duration = 5;
	},
	randomDelay: 1000,
	minVelocity: 10,
	maxVelocity: 20
});


/**
 * OpenTSDB Consumers
 */
new OpenTSDBConsumer(io, {
	metric: 'js_errors',
	eventName: 'js_errors',
	processor: function(json) {
		var sum = 0;
		for (var i in json.data) {
			sum += json.data[i][1];
		}

		var maxsum = 250;

		var fc = 0;

		if (sum > maxsum) fc = 1;
		else fc = sum / maxsum;

		var data = {};
		data.oscillator = 1;
		data.filterCutoff = fc;
		data.filterResonance = 0.1;
		data.volume = 0.2;
		data.note = "A2";
		return data;
	}
});

new OpenTSDBConsumer(io, {
	metric: 'user_like',
	eventName: 'user_like',
	processor: function(json) {
		var sum = 0;
		for (var i in json.data) {
			sum += json.data[i][1];
		}

		var maxsum = 7000;

		var fc = 0;

		if (sum > maxsum) fc = 1;
		else fc = sum / maxsum;

		var possibleNotes = ["F1", "F1", "F1", "Bb1", "C2", "D1"];

		var theNote = possibleNotes[Math.floor(Math.random()*possibleNotes.length)];

		var data = {};
		data.oscillator = 2;
		data.filterCutoff = fc;
		data.filterResonance = 0.05;
		data.volume = 0.2;
		data.note = theNote;
		return data;
	}
});

new GrooveConsumer(io, {
	eventName: 'groove'
});