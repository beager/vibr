var channels = {
	'infatuation': {
		name: 'Lovers and Friends',
		description: 'Warm-fuzzy central.',
		technical_info: 'The bass note\'s intensity measures user_like volume, and fan_mail actions are sprinkled on top.',
		transpose: 5,
		midi: {
			0: {
				name: 'fan_mail',
				scale: [0, 4, 5, 7, 11],
				patch: 9,
				ir: true
			},
			1: {
				name: 'groove',
				scale: 'chromatic',
				patch: 116
			}
		},
		synth: {
			0: {
				name: 'user_like',
			}
		},
		impulse_response: './ir/matrix-reverb1.wav'
	},
	'splunk_plunk': {
		name: 'Splunk Plunk',
		description: 'All the Hits, Fatals, and Exceptions. Zero commercials.',
		technical_info: 'Each note corresponds to an error entry in web-errors.log.',
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
		description: 'The Soothing Sounds of New Tumblr Users',
		technical_info: 'Each note corresponds to one successful new user registration.',
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
		technical_info: 'The frequency of the oscillator\'s filter corresponds to the number of sampled JS errors over a 5 minute period.',
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
		technical_info: 'Emits a primal drum beat every time someone searches for "sex" on Tumblr.',
		transpose: 1,
		midi: {
			0: {
				name: 'sexy_search',
				scale: [0, 5, 7, 10],
				patch: 116
			}
		},
		impulse_response: './ir/matrix-reverb1.wav'
	},
	'sad_derek': {
		name: '<em>Lacrimosa alla derekg</em> in D minor',
		description: 'The sadness of unfollowing and deletion brought to life',
		technical_info: 'Each cello note represents a user who has just deleted their account. Higher notes are older users. Stronger notes are users who were more engaged (following more blogs). The piano chords represent some of the unfollows that happen to blogs.',
		transpose: 2,
		midi: {
			0: {
				name: 'soft_delete_user',
				scale: 'harmonic_minor',
				patch: 42
			},
			1: {
				name: 'user_unfollow',
				scale: [0, 3, 7],
				patch: 0
			}
		},
		impulse_response: './ir/matrix-reverb5.wav'
	},
	'groove': {
		name: 'Groove test',
		description: '',
		technical_info: '',
		transpose: 0,
		midi: {
			0: {
				name: 'groove',
				scale: 'chromatic',
				patch: 117
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
			$('table').removeClass('hidden');
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