var synth;

$(document).ready(function(){
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instruments: ["acoustic_grand_piano"],
		callback: function() {

			MIDI.setReverbImpulseResponse('./ir/spatialized7.wav');

			function playNote(data) {
				var pitch = get_note_from_scale(data.note, 'pentatonic');
				MIDI.noteOn(0, pitch, data.velocity, 0);
				MIDI.noteOff(0, pitch, data.duration);
			}

			function playOpenTSDB(data) {
				var freq_total = 0;
				for (var i in data) {
					freq_total += data[i][1];
				}
				changeBassNote(Math.floor(freq_total) * 4);
			}

			window.addEventListener("message", function(event) {
				switch(event.data.type) {
					case 'midi':
						if (can_play_note(event.data.name)) playNote(event.data.data);
						break;
					case 'opentsdb':
						if (can_play_synth(event.data.name)) playOpenTSDB(event.data.data);
						break;
				}
			});
		}
	});

  var audioContext = new webkitAudioContext();
  audioContext.sampleRate = 44100;

  synth = new MonoSynth(audioContext);
});

var bassNotes = ['C2', 'D2', 'E2', 'G2', 'C3'];

function changeBassNote(note) {
	note = note || bassNotes[Math.floor(Math.random()*bassNotes.length)];
	synth.noteSlide(note, 0.02);
}