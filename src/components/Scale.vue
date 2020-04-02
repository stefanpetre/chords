<template>
  <div class="scalebox" :class="{open: opened}">
    <div class="row row-collapsed">
      <div class="col">
        <button class="btn btn-primary title" @click="toggleExpansion">
          <div class="group">
            <div class="group-addon">
              <i class="mdi mdi-chevron-down"></i>
              <i class="mdi mdi-chevron-up"></i>
            </div>
            <div class="group-content text-bold">Scale {{scale.root.key}} {{scale.type.name}}</div>
          </div>
        </button>
      </div>
    </div>
    <div class="settings">
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="col">
              <div class="m-hg-v">Root key
                <c-piano-roll :keys="[scale.root]" :interactive="true" @select="togglePicker"></c-piano-roll>
              </div>
            </div>
            <div class="col">
              <div class="m-hg-v">Type
                <c-scale-picker v-model="scale.type"></c-scale-picker>
              </div>
            </div>
          </div>
          <div class="m-hg-v">Keys in scale
            <c-piano-roll :keys="scale.keys"></c-piano-roll>
          </div>
        </div>
        <div class="col-md-4">Chords in scale:
          <c-chord
            v-for="chord in scale.chords"
            :key="chord.scale.name"
            :chord="chord"
            :expandable="false"
            @select="selectChord"
            :len-overwrite="0"
          ></c-chord>
        </div>
      </div>
    </div>
    <c-note-picker v-model="picker" @select="changeRoot"></c-note-picker>
  </div>
</template>

<script>
import Scale from "../lib/scale";
import EventBus from "../lib/eventbus";

export default {
  name: "cScale",
  data() {
    return {
      scale: new Scale("C", "major"),
      picker: false,
      opened: true
    };
  },
  methods: {
    togglePicker() {
      this.picker = !this.picker;
    },
    changeRoot(note) {
      this.scale.root = note;
    },
    selectChord(chord) {
      EventBus.$emit("selectChord", chord);
    },
    toggleExpansion() {
      this.opened = !this.opened;
    }
  }
};
</script>