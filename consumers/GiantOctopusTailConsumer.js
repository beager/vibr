Tail = require('tail').Tail;

function GiantOctopusTailConsumer(io, options) {
	this.io = io;
	this.latency = options.latency;
	this.eventName = options.eventName;
	this.latency = 120000;
	this.randomDelay = options.randomDelay || 1000;
	this.url = options.url;

	this.tail = new Tail(this.url);

	this.tail.on("line", function(data) {
		var linedata = data.split("\t");
		var time = new Date().getTime();
		var log_time = linedata[0] * 1000;
		var delay = time - log_time;
		if (delay < 0 || delay > this.latency) return;
		var note = Math.floor((Math.random()*20)+20);
		var velocity = Math.floor((Math.random()*36)+36);
		var delay_random = Math.floor(Math.random()*this.randomDelay);

		setTimeout(function(){
			this.io.sockets.emit(this.eventName, {
				name: this.eventName,
				type: 'midi',
				data: {
					note: note,
					velocity: velocity,
					duration: 5
				}
			});
		}.bind(this), delay + delay_random);
	}.bind(this));
}

exports.GiantOctopusTailConsumer = GiantOctopusTailConsumer;