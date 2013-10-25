var http = require('http');

function OpenTSDBConsumer(io, options) {
	this.io = io;
	this.metric = options.metric || '';
	this.eventName = options.eventName;
	this.aggregator = options.aggregator || 'sum';
	this.rate = options.rate || true; // default true
	this.refresh_rate = options.refresh_rate || 10000; // default 10s;
	this.band_size = options.band_size || 300; // five minute band, smaller is quicker;
	this.tsdhost = options.tsdhost || 'http://fibr.ewr01.tumblr.net:6081/';
	this.path = options.path || 'api/query';

	this.update = function() {
		var now = new Date().getTime();
		now = Math.floor(now / 1000); // ms
		var bandstart = now - this.band_size;
		var rate = this.rate ? 'true' : 'false';
		var query = '?start=' + bandstart + 
					'&metric=' + this.metric +
					'&aggregator=' + this.aggregator +
					'&rate=' + this.rate;
		json_url = this.tsdhost + this.path + query;

		http.get(json_url, function(res){
			var body = '';

			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function() {
				try {
					var jsonResponse = JSON.parse(body);
					this.io.sockets.emit(this.eventName, {
						name: this.eventName,
						type: 'opentsdb',
						data: jsonResponse.data
					});
				} catch (e) {
					console.log('TSDB failed for ' + this.metric);
				}
			}.bind(this));
		}.bind(this));

		setTimeout(this.update.bind(this), this.refresh_rate);
	};

	this.update();
}

exports.OpenTSDBConsumer = OpenTSDBConsumer;