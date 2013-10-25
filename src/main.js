var synth;

$(document).ready(function(){
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		callback: function() {

			MIDI.setReverbImpulseResponse('./ir/spatialized7.wav');

			function playNote(data) {
				var pitch = get_note_from_scale(data.note, 'pentatonic');
				MIDI.noteOn(0, pitch, data.velocity, 0);
				MIDI.noteOff(0, pitch, data.duration);
			}

			window.addEventListener("message", function(event) {
				playNote(event.data);
			});
		}
	});

  var audioContext = new webkitAudioContext();
  audioContext.sampleRate = 44100;

  synth = new MonoSynth(audioContext);

  synth.noteOn('C2', 0.05);

  setTimeout(changeBassNote, 12000);

});

var bassNotes = ['C2', 'D2', 'E2', 'G2', 'C3'];

function changeBassNote() {
	var note = bassNotes[Math.floor(Math.random()*bassNotes.length)];
	synth.noteSlide(note, 0.05);
	setTimeout(changeBassNote, 12000);
}