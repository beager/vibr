var channels = {
	'splunk_plunk': {
		description: 'Plays random notes when web errors happen.',
		midi: {
			0: {
				name: 'web_errors'
			}
		}
	},
	'andres_tinnitus': {
		description: 'Plays a frequency that correlates to the number of sampled JS errors in the past 5 minutes.',
		synth: {
			0: {
				name: 'js_errors'
			}
		}
	}
};

var current_channel = {};

$(document).ready(function(){
	$('#channels').on('change', function(e){
		var channel = this.value;
		if (channel in channels) {
			switch_channel(channels[channel]);
		}
	});
});

function switch_channel(channel) {
	// todo turn everything off
	synth.noteOff();
	current_channel = channel;
	$('#description').html(current_channel.description);
}

function can_play_note(name) {
	for (var i in current_channel.midi) {
		if (current_channel.midi[i].name === name) {
			return true;
		}
	}
	return false;
}

function can_play_synth(name) {
	for (var i in current_channel.synth) {
		if (current_channel.synth[i].name === name) {
			return true;
		}
	}
	return false;
}