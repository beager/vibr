var  C0 = 0;
var Cs0 = 1;
var Db0 = 1;
var  D0 = 2;
var Ds0 = 3;
var Eb0 = 3;
var  E0 = 4;
var  F0 = 5;
var Fs0 = 6;
var Gb0 = 6;
var  G0 = 7;
var Gs0 = 8;
var Ab0 = 8;
var  A0 = 9;
var As0 = 10;
var Bb0 = 10;
var  B0 = 11;

var  C1 = 12;
var Cs1 = 13;
var Db1 = 13;
var  D1 = 14;
var Ds1 = 15;
var Eb1 = 15;
var  E1 = 16;
var  F1 = 17;
var Fs1 = 18;
var Gb1 = 18;
var  G1 = 19;
var Gs1 = 20;
var Ab1 = 20;
var  A1 = 21;
var As1 = 22;
var Bb1 = 22;
var  B1 = 23;

var  C2 = 24;
var Cs2 = 25;
var Db2 = 25;
var  D2 = 26;
var Ds2 = 27;
var Eb2 = 27;
var  E2 = 28;
var  F2 = 29;
var Fs2 = 30;
var Gb2 = 30;
var  G2 = 31;
var Gs2 = 32;
var Ab2 = 32;
var  A2 = 33;
var As2 = 34;
var Bb2 = 34;
var  B2 = 35;

var  C3 = 36;
var Cs3 = 37;
var Db3 = 37;
var  D3 = 38;
var Ds3 = 39;
var Eb3 = 39;
var  E3 = 40;
var  F3 = 41;
var Fs3 = 42;
var Gb3 = 42;
var  G3 = 43;
var Gs3 = 44;
var Ab3 = 44;
var  A3 = 45;
var As3 = 46;
var Bb3 = 46;
var  B3 = 47;

var  C4 = 48;
var Cs4 = 49;
var Db4 = 49;
var  D4 = 50;
var Ds4 = 51;
var Eb4 = 51;
var  E4 = 52;
var  F4 = 53;
var Fs4 = 54;
var Gb4 = 54;
var  G4 = 55;
var Gs4 = 56;
var Ab4 = 56;
var  A4 = 57;
var As4 = 58;
var Bb4 = 58;
var  B4 = 59;

var  C5 = 60;
var Cs5 = 61;
var Db5 = 61;
var  D5 = 62;
var Ds5 = 63;
var Eb5 = 63;
var  E5 = 64;
var  F5 = 65;
var Fs5 = 66;
var Gb5 = 6;
var  G5 = 67;
var Gs5 = 68;
var Ab5 = 68;
var  A5 = 69;
var As5 = 70;
var Bb5 = 70;
var  B5 = 71;

var  C6 = 72;
var Cs6 = 73;
var Db6 = 73;
var  D6 = 74;
var Ds6 = 75;
var Eb6 = 75;
var  E6 = 76;
var  F6 = 77;
var Fs6 = 78;
var Gb6 = 78;
var  G6 = 79;
var Gs6 = 80;
var Ab6 = 80;
var  A6 = 81;
var As6 = 82;
var Bb6 = 82;
var  B6 = 83;

var  C7 = 84;
var Cs7 = 85;
var Db7 = 85;
var  D7 = 86;
var Ds7 = 87;
var Eb7 = 87;
var  E7 = 88;
var  F7 = 89;
var Fs7 = 90;
var Gb7 = 90;
var  G7 = 91;
var Gs7 = 92;
var Ab7 = 92;
var  A7 = 93;
var As7 = 94;
var Bb7 = 94;
var  B7 = 95;

var  C8 = 96;
var Cs8 = 97;
var Db8 = 97;
var  D8 = 98;
var Ds8 = 99;
var Eb8 = 99;
var  E8 = 100;
var  F8 = 101;
var Fs8 = 102;
var Gb8 = 102;
var  G8 = 103;
var Gs8 = 104;
var Ab8 = 104;
var  A8 = 105;
var As8 = 106;
var Bb8 = 106;
var  B8 = 107;

var  C9 = 108;
var Cs9 = 109;
var Db9 = 109;
var  D9 = 110;
var Ds9 = 111;
var Eb9 = 111;
var  E9 = 112;
var  F9 = 113;
var Fs9 = 114;
var Gb9 = 114;
var  G9 = 115;
var Gs9 = 116;
var Ab9 = 116;
var  A9 = 117;
var As9 = 118;
var Bb9 = 118;
var  B9 = 119;

var  C10 = 120;
var Cs10 = 121;
var Db10 = 121;
var  D10 = 122;
var Ds10 = 123;
var Eb10 = 123;
var  E10 = 124;
var  F10 = 125;
var Fs10 = 126;
var Gb10 = 126;
var  G10 = 127;

var scales = {
	major: [0, 2, 4, 5, 7, 9, 11],
	minor: [0, 2, 3, 5, 7, 8, 10],
	harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
	melodic_minor: [0, 2, 3, 5, 7, 9, 11],
	pentatonic: [0, 2, 4, 7, 9]
};

function get_note_from_scale(id, scale) {
	var thescale = scales[scale];
	var mod = thescale.length;
	var oct = Math.floor(id / mod);
	var pitch = id % mod;

	return (oct * 12) + thescale[pitch];
}