<template>
  <div class="trackbox">
    <div class="text-bold">Track</div>BPM
    <div class="row">
      <div class="col">
        <input type="range" min="0" max="200" step="1" v-model="bpm">
      </div>
      <div class="col-auto">
        <input type="number" min="0" max="200" step="1" v-model="bpm">
      </div>
    </div>
    <div
      class="chords"
      v-sortable="{onChange: changePosition, childs: '.chordbox', handle: '.title'}"
    >
      <c-chord
        v-for="(chord,indx) in chords"
        :key="indx"
        :indx="indx"
        :chord="chord"
        :options="actions"
        @select="select"
      ></c-chord>
      <button class="btn btn-primary" @click="addChord(false)">
        <i class="mdi mdi-plus"></i>Add chord
      </button>
      <button class="btn btn-primary" @click="exportMIIDI">
        <i class="mdi mdi-export"></i> Export as MIDI
      </button>
      <button class="btn btn-primary" @click="play">
        <i class="mdi mdi-play"></i> Play
      </button>
      <button class="btn btn-primary" @click="stop">
        <i class="mdi mdi-stop"></i> Stop
      </button>
      <button class="btn btn-primary" @click="save" v-if="chords.length > 0">
        <i class="mdi mdi-content-save"></i> Save
      </button>
    </div>
  </div>
</template>

<script>
import EventBus from "../lib/eventbus";
import sortable from "../directives/sortable.js";
import Chord from "../lib/chord";
import Midi from "jsmidgen";
import { saveAs } from "file-saver";
import lengths from "../data/lengths";

export default {
  name: "cTrack",
  data() {
    return {
      chords: [],
      actions: [
        {
          name: "duplicate",
          icon: "mdi-content-duplicate",
          text: "Duplicate"
        },
        {
          name: "save",
          icon: "mdi-content-save",
          text: "Save"
        },
        {
          name: "remove",
          icon: "mdi-delete",
          text: "Remove"
        },
        {
          name: "play",
          icon: "mdi-play",
          text: "Play chord"
        }
      ],
      bpm: 120
    };
  },
  methods: {
    addChord(chord, indx = -1) {
      const newChord = chord ? chord.clone() : new Chord("C", "major");
      if (indx == -1) {
        this.chords.push(newChord);
      } else {
        this.chords.splice(indx, 0, newChord);
      }
    },
    addTrack(track) {
      this.chords = [];
      track.chords.forEach(chord => {
        this.addChord(new Chord(chord));
      });
    },
    select(chord, action, indx) {
      switch (action) {
        case "remove":
          this.chords.splice(indx, 1);
          break;
        case "duplicate":
          this.addChord(chord, indx + 1);
          break;
        case "play":
          EventBus.$emit("play", [chord.clone()], false);
          break;
        case "save":
          EventBus.$emit("saveChord", chord);
          break;
      }
    },
    changePosition(fromIndx, toIndx) {
      this.chords.splice(toIndx, 0, this.chords.splice(fromIndx, 1)[0]);
    },
    exportMIIDI() {
      var file = new Midi.File();
      var track = new Midi.Track();
      file.addTrack(track);

      this.chords.forEach(chord => {
        const notes = [];
        chord.keys.forEach(note => {
          notes.push(note.key + note.octave);
        });
        track.addChord(0, notes, lengths[chord.len].midi);
      });

      const bytes = file.toBytes();
      const u16 = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        u16[i] = bytes[i].charCodeAt(0);
      }
      const blob = new Blob([u16], { type: "audio/midi" });
      saveAs(blob, "track.mid");
    },
    play() {
      const chords = [];
      this.chords.forEach(chord =>{
        chords.push(chord.clone());
      });
      EventBus.$emit("play", this.chords, true);
    },
    stop() {
      EventBus.$emit("stop");
    },
    save() {
      EventBus.$emit("saveTrack", this.chords);
    }
  },
  watch: {
    bpm(value) {
      EventBus.$emit("bpm", this.bpm);
    }
  },
  mounted() {
    EventBus.$on("selectChord", this.addChord);
    EventBus.$on("selectTrack", this.addTrack);
    EventBus.$emit("bpm", this.bpm);
  },
  beforeDestroy() {
    EventBus.$off("selectChord", this.addChord);
  },
  directives: {
    sortable: sortable
  }
};
</script>