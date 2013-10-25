function GrooveConsumer(io, options) {
	this.io = io;
	this.eventName = options.eventName;
	this.audioConsumer = options.audioConsumer || 'midi';

	this.emitsound = function(note, velocity, duration) {
		var payload = {
			note: note,
			velocity: velocity,
			duration: duration
		};
		this.io.sockets.emit(this.eventName, {
			name: this.eventName,
			type: this.audioConsumer,
			data: payload
		});
	};

	this.loop = function() {
		var now = new Date().getTime();

		var groove = [16];

		var bar = Math.floor(60000 / 60);
		var eighths = Math.floor(bar / 4);

		var curtime = 0;

		for (var i = 0; i < groove.length; i++) {
			var note = groove[i];
			setTimeout(this.emitsound(note, 40, 5), i * eighths);
		}

		setTimeout(this.loop, bar);
	}.bind(this);

	this.loop();
}

exports.GrooveConsumer = GrooveConsumer;