$(document).ready(function(){
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {

			// play the note
			MIDI.setVolume(0, 127);
			$('#button').click(function(e) {
							var delay = 0; // play one note every quarter second
					var note = 50; // the MIDI note
					var velocity = 127; // how hard the note hits

				console.log('hey');
				MIDI.noteOn(0, note, velocity, delay);
				MIDI.noteOn(0, note+4, velocity, delay);
				MIDI.noteOn(0, note+7, velocity, delay);
				MIDI.noteOn(0, note+12, velocity, delay);
				MIDI.noteOff(0, note, delay + 5);
				MIDI.noteOff(0, note+4, delay + 5);
				MIDI.noteOff(0, note+7, delay + 5);
				MIDI.noteOff(0, note+12, delay + 5);
			});

			MIDI.setReverbImpulseResponse('./ir/spatialized7.wav');

			function playNote(data) {
				var pitch = get_note_from_scale(data.note, 'pentatonic');
				console.log(pitch);
				MIDI.noteOn(0, pitch, data.velocity, 0);
				MIDI.noteOff(0, pitch, data.duration);
			}

			window.addEventListener("message", function(event) {
				playNote(event.data);
			});
		}
	});

});