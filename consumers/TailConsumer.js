Tail = require('tail').Tail;

function TailConsumer(io, options) {
	this.io = io;
	this.options = options;

	this.latency = this.options.latency;
	this.eventName = this.options.eventName;
	this.latency = 120000;
	this.url = this.options.url;

	this.tail = new Tail(this.url);

	this.tail.on("line", function(data) {
		var linedata = data.split(" ");
		var time = new Date().getTime();
		var log_time = Date.parse(linedata[0]);
		var delay = time - log_time;
		if (delay < 0 || delay > this.latency) return;
		var note = Math.floor((Math.random()*20)+20);
		var velocity = Math.floor((Math.random()*36)+36);
		var delay_random = Math.floor(Math.random()*1000);

		setTimeout(function(){
			this.io.sockets.emit(this.eventName, {
				note: note,
				velocity: velocity,
				duration: 5
			});
		}.bind(this), delay + delay_random);
	}.bind(this));
}

exports.TailConsumer = TailConsumer;