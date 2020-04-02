<template>
  <div class="player"></div>
</template>

<script>
import Tone from "tone";
import EventBus from "../lib/eventbus";
import lengths from "../data/lengths";

export default {
  name: "cPlayer",
  data() {
    return {
      synth: null,
      played: false,
      indx: 0,
      chords: []
    };
  },
  methods: {
    triggerSynth(time) {
      const chord = this.chords[this.indx];
      const notes = [];
      chord.keys.forEach(note => {
        notes.push(note.key + note.octave);
      });
      this.synth.triggerAttackRelease(notes, lengths[chord.len].tone, time);
      this.indx += 1;
      if (this.indx >= this.chords.length) {
        this.indx = 0;
      }
    },
    play(chords, looped = false) {
      this.stop();

      this.indx = 0;
      this.chords = chords;

      let globalTime = 0;

      chords.forEach(chord => {
        const time = new Tone.Time(lengths[chord.len].tone);
        Tone.Transport.schedule(this.triggerSynth, globalTime);
        globalTime += time.toSeconds() + 0.01;
      });

      if (looped) {
        Tone.Transport.loop = true;
        Tone.Transport.loopEnd = globalTime;
      } else {
        Tone.Transport.loop = false;
      }

      Tone.Transport.start();
    },
    stop() {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
    },
    bpm(value) {
      Tone.Transport.bpm.value = value;
    }
  },
  mounted() {
    this.synth = new Tone.PolySynth(8, Tone.Synth, {
      portamento: 0,
      oscillator: {
        type: "fatsawtooth",
        count: 3,
        spread: 30
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.5,
        release: 0.4,
        attackCurve: "exponential"
      }
    }).toMaster();
    EventBus.$on("play", this.play);
    EventBus.$on("stop", this.stop);
    EventBus.$on("bpm", this.bpm);
  },
  beforeDestroy() {
    EventBus.$off("play", this.play);
    EventBus.$off("bpm", this.bpm);
    EventBus.$off("bpm", this.bpm);
  }
};
</script>