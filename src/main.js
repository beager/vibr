var synth;

$(document).ready(function(){
	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instruments: [
			"acoustic_grand_piano",
			"acoustic_guitar_nylon",
			"electric_piano_1",
			"electric_piano_2",
			"pad_5_bowed",
			"taiko_drum",
			"music_box",
			"cello"
		],
		callback: function() {

			window.addEventListener("message", function(event) {
				switch(event.data.type) {
					case 'midi':
						if (midi_channel(event.data.name) !== false) playNote(event.data.name, event.data.data, midi_channel(event.data.name));
						break;
					case 'opentsdb':
						if (synth_channel(event.data.name) !== false) playOpenTSDB(event.data.data);
						break;
					case 'synth_control':
						if (synth_channel(event.data.name) !== false) playSynthControlEvent(event.data.data);
				}
			});
		}
	});

  var audioContext = new webkitAudioContext();
  audioContext.sampleRate = 44100;

  synth = new MonoSynth(audioContext);
});

function playSynthControlEvent(data) {
	if (data.oscillator) synth.setOscillator(data.oscillator);
	if (data.filterCutoff) synth.setFilterFrequency(data.filterCutoff);
	if (data.filterResonance) synth.setFilterResonance(data.filterResonance);
	if (data.note) synth.noteOn(data.note);
}

var bassNotes = ['C2', 'D2', 'E2', 'G2', 'C3'];

function changeBassNote(note) {
	note = note || bassNotes[Math.floor(Math.random()*bassNotes.length)];
	synth.noteOn(note, 0.02);
}

function playNote(name, data, channel) {
	var channel = midi_channel(name);
	var scale = current_channel.midi[channel].scale || 'major';
	var pitch = get_note_from_scale(data.note, scale);
	pitch += current_channel.transpose;
	MIDI.noteOn(channel, pitch, data.velocity, 0);
	MIDI.noteOff(channel, pitch, data.duration);
}

function playOpenTSDB(data) {
	var freq_total = 0;
	for (var i in data) {
		freq_total += data[i][1];
	}
	changeBassNote(Math.floor(freq_total) * 4);
}

function listen_to_signals(signals) {
	var signal_string = signals.join(',');
	$('#listener').attr('src', 'http://localhost:8080/?r=t&s=' + signal_string);
}