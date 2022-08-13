var kick = new Wad({source : 'audio/kick.mp3'});
kick.globalReverb = true;
var bpm = 100;
var beat = 60 / bpm;

var bass = new Wad({
    source : 'sawtooth',
    volume : .9,
    env : {
        attack : .02,
        decay : .1,
        sustain : .3,
        hold : .2,
        release : .1
    },
    filter  : {
        type      : 'lowpass', // What type of filter is applied.
        frequency : 600,       // The frequency, in hertz, to which the filter is applied.
        q         : 1,         // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
        env       : {          // Filter envelope.
            frequency : 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
            attack    : 0.5  // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
        }
    },
})

var piano = new Wad({source : 'square', volume : 1.4, env : {attack : .01, decay : .005, sustain : .2, hold : .015, release : .3}, filter : {type : 'lowpass', frequency : 1200, q : 8.5, env : {attack : .2, frequency : 600}}});
piano.globalReverb = true;

var hat = new Wad(Wad.presets.hiHatClosed);
hat.globalReverb = true;
var snare = new Wad(Wad.presets.snare);
snare.globalReverb = true;
var hatOpen = new Wad(Wad.presets.hiHatOpen);
hatOpen.globalReverb = true;
var ghost = new Wad(Wad.presets.ghost);
Wad.setGlobalReverb({impulse : 'audio/widehall.wav', wet : .4});
snare.setVolume(9);

var oneLoop = function() {
    bass.play({ pitch : 'B2',   wait : beat * 0});
    bass.play({ pitch : 'B2',   wait : beat * 1});
    bass.play({ pitch : 'A2',   wait : beat * 1.75});
    bass.play({ pitch : 'B2',   wait : beat * 2});
    bass.play({ pitch : 'B2',   wait : beat * 3});
    
    bass.play({ pitch : 'D3',  wait : beat * 4});
    bass.play({ pitch : 'D3',  wait : beat * 5});
    bass.play({ pitch : 'D3',  wait : beat * 5.75});
    bass.play({ pitch : 'D3',  wait : beat * 6});
    bass.play({ pitch : 'D3',  wait : beat * 7});
    
    bass.play({ pitch : 'Gb3', wait : beat * 8});
    bass.play({ pitch : 'Gb3', wait : beat * 9});
    bass.play({ pitch : 'Gb3', wait : beat * 9.75});
    bass.play({ pitch : 'Gb3', wait : beat * 10});
    bass.play({ pitch : 'Gb3', wait : beat * 10.5});
    
    bass.play({ pitch : 'E3',  wait : beat * 12});
    bass.play({ pitch : 'E3',  wait : beat * 13});
    bass.play({ pitch : 'E3',  wait : beat * 13.5});
    bass.play({ pitch : 'E3',  wait : beat * 13.75});
}

function play() {
    oneLoop();
    setInterval(oneLoop, Math.floor(beat * 32 * 1000));
}