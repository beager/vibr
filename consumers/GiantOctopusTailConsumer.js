Tail = require('tail').Tail;

function GiantOctopusTailConsumer(io, options) {
	this.io = io;
	this.latency = options.latency;
	this.eventName = options.eventName;
	this.latency = 120000;
	this.randomDelay = options.randomDelay || 1000;
	this.url = options.url;

	this.minVelocity = options.minVelocity || 0;
	this.maxVelocity = options.maxVelocity || 127;

	this.minNote = options.minNote || 20;
	this.maxNote = options.maxNote || 40;

	this.filter = options.filter || false;

	this.tail = new Tail(this.url);

	this.tail.on("line", function(data) {
		var linedata = data.split("\t");
		var time = new Date().getTime();
		var log_time = linedata[0] * 1000;
		var delay = time - log_time;
		if (delay < 0 || delay > this.latency) return;
		var delay_random = Math.floor(Math.random()*this.randomDelay);

		if (this.filter) {
			var res = this.filter(data);
			if (!res) return false;
		}

		var payload;
		if (!this.processor) {
			payload = {
				note: Math.floor(Math.random()*(this.maxNote - this.minNote))+this.minNote,
				velocity: Math.floor((Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity),
				duration: 5
			};
		} else {
			payload = this.processor(payload);
		}

		setTimeout(function(){
			this.io.sockets.emit(this.eventName, {
				name: this.eventName,
				type: 'midi',
				data: payload
			});
		}.bind(this), delay + delay_random);
	}.bind(this));
}

exports.GiantOctopusTailConsumer = GiantOctopusTailConsumer;