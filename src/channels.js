var channels = {
	'splunk_plunk': {
		description: 'All the Hits. All the Fatals. All the Exceptions. Zero commercials.',
		transpose: 2,
		midi: {
			0: {
				name: 'web_errors',
				scale: 'major',
				patch: 4
			}
		},
		impulse_response: './ir/cardiod-true-stereo-15-8.wav'
	},
	'user_registration_attempt': {
		description: 'The Soothing Sounds of New Tumblr Users!',
		transpose: -4,
		midi: {
			0: {
				name: 'user_registration_attempt',
				scale: [0, 2, 4, 7, 9, 11],
				patch: 4
			}
		},
		impulse_response: './ir/matrix-reverb6.wav'
	},
	'andres_tinnitus': {
		description: 'Listen to Andres\' Stress Level Rise and Fall.',
		synth: {
			0: {
				name: 'js_errors',
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
	if (current_channel.impulse_response) MIDI.setReverbImpulseResponse(current_channel.impulse_response);
	for (var i in current_channel.midi) {
		MIDI.programChange(i, current_channel.midi[i].patch);
	}
}

function midi_channel(name) {
	for (var i in current_channel.midi) {
		if (current_channel.midi[i].name === name) {
			return i;
		}
	}
	return false;
}

function synth_channel(name) {
	for (var i in current_channel.synth) {
		if (current_channel.synth[i].name === name) {
			return i;
		}
	}
	return false;
}