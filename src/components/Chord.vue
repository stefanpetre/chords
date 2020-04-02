<template>
  <div class="chordbox" :class="{open: opened}">
    <div class="row row-collapsed">
      <div class="col">
        <button
          class="btn btn-primary title"
          @click="toggleSettings"
          v-if="expandable"
          draggable="draggable"
        >
          <div class="group">
            <div class="group-addon">
              <i class="mdi mdi-chevron-down"></i>
              <i class="mdi mdi-chevron-up"></i>
            </div>
            <div class="group-content">
              <span v-if="chord.scale">{{chord.scale.name}}:</span>
              {{chord.name}} {{lengths[chord.len].name}}
            </div>
          </div>
        </button>
        <button class="btn btn-primary title" v-else @click="select">
          <span v-if="chord.scale">{{chord.scale.name}}:</span>
          {{chord.name}} {{lengths[chord.len].name}}
        </button>
      </div>
      <div class="col col-auto" v-for="(option, indx) in options" :key="indx">
        <button class="btn btn-primary" @click="select(option.name)" :title="option.text">
          <i class="mdi" :class="[option.icon]"></i>
        </button>
      </div>
    </div>
    <div class="settings" v-if="expandable">
      <div class="row">
        <div class="col">
          <div class="m-hg-v">
            Type
            <select v-model="type">
              <option :value="type.type" v-for="type in types" :key="type.type">{{type.value.name}}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="m-hg-v">
            Octave
            <input type="number" min="0" max="8" step="1" v-model="chord.octave">
          </div>
        </div>
        <div class="col">
          <div class="m-hg-v">
            Length
            <select v-model="chord.len">
              <option v-for="(leng, indx) in lengths" :key="indx" :value="indx">{{leng.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <div class="m-hg-v">Root key
            <c-piano-roll :keys="[chord.root]" :interactive="true" @select="togglePicker"></c-piano-roll>
          </div>
        </div>
        <div class="col">
          <div class="m-hg-v">Keys
            <c-piano-roll :keys="chord.keys" :octave="true"></c-piano-roll>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          Inversion
          <select v-model="chord.inversion">
            <option
              v-for="(inversion, indx) in chord.possibleInversions"
              :key="indx"
              :value="indx"
            >{{inversion}}</option>
          </select>
        </div>
        <div class="col">Voicing
          <div class="row">
            <div class="col col-auto" v-for="(voicing, indx) in chord.voicing" :key="indx">
              <input type="number" min="-2" max="2" step="1" v-model="chord.voicing[indx]">
            </div>
          </div>
        </div>
      </div>
    </div>
    <c-note-picker v-model="picker" @select="changeRoot"></c-note-picker>
  </div>
</template>

<script>
//:style="{minHeight: lengths[chord.len].height * lenOverwrite + 'px'}"
import lengths from "../data/lengths";
import chords from "../data/chords";

export default {
  name: "cChord",
  props: {
    chord: {
      type: Object
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    expandable: {
      type: Boolean,
      default: true
    },
    lenOverwrite: {
      type: Number,
      default: 1
    },
    indx: {}
  },
  data() {
    return {
      //inversions: ["none", "first", "second", "third"],
      opened: false,
      lengths: lengths,
      picker: false,
      types: [],
      type: null
    };
  },
  methods: {
    toggleSettings() {
      this.opened = !this.opened;
    },
    select(action) {
      this.$emit("select", this.chord, action, this.indx);
    },
    changeRoot(note) {
      this.chord.root = note;
    },
    togglePicker() {
      this.picker = !this.picker;
    }
  },
  watch: {
    type() {
      this.chord.type = chords[this.type];
    }
  },
  mounted() {
    this.type = this.chord.type.type;
    for (let type in chords) {
      this.types.push({
        type: type,
        value: chords[type]
      });
    }
  }
};
</script>