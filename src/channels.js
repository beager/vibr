var channels = {
	'splunk_plunk': {
		name: 'Splunk Plunk',
		description: 'All the Hits. All the Fatals. All the Exceptions. Zero commercials.',
		technical_info: 'Each note corresponds to an error entry in web-errors.log. There is a 2 minute delay.',
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
		name: 'The Register',
		description: 'The Soothing Sounds of New Tumblr Users!',
		technical_info: 'Each note corresponds to one successful new user registration. There is a short delay.',
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
		name: 'Andres\' Tinnitus',
		technical_info: 'The frequency of the oscillator is 3x the number of samples JS errors over a 5 minute period.',
		description: 'Listen to Andres\' Stress Level Rise and Fall.',
		synth: {
			0: {
				name: 'js_errors',
			}
		}
	},
	'sexy_search': {
		name: 'Skin Seekers',
		description: 'Listening to your lust, 24/7',
		technical_info: 'Emits a note every time someone searches for "sex"',
		transpose: 1,
		midi: {
			0: {
				name: 'sexy_search',
				scale: [0, 5, 7, 10],
				patch: 116
			}
		},
		impulse_response: './ir/matrix-reverb1.wav'
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
	$('#station_name').html(current_channel.name);
	$('#station_description').html(current_channel.description);
	$('#station_technical_info').html(current_channel.technical_info);
	if (current_channel.impulse_response) MIDI.setReverbImpulseResponse(current_channel.impulse_response);

	var signals_to_hear = [];
	for (var i in current_channel.midi) {
		signals_to_hear.push(current_channel.midi[i].name);
		MIDI.programChange(i, current_channel.midi[i].patch);
	}

	for (var i in current_channel.synth) {
		signals_to_hear.push(current_channel.synth[i].name);
	}

	listen_to_signals(signals_to_hear);
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