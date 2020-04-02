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
            <div class="group-content text-bold">Saved chords</div>
          </div>
        </button>
      </div>
    </div>
    <div class="settings">
      <c-chord
        v-for="(chord,indx) in chords"
        :key="indx"
        :chord="chord"
        :expandable="false"
        :options="actions"
        @select="select"
        :indx="indx"
      ></c-chord>
    </div>
  </div>
</template>

<script>
import EventBus from "../lib/eventbus";
import { Getters, Setters } from "../lib/state";
import Chord from "../lib/chord";

export default {
  name: "cStateChords",
  data() {
    return {
      opened: false,
      chords: [],
      actions: [
        {
          name: "add",
          icon: "mdi-plus",
          text: "Add to track"
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
      ]
    };
  },
  methods: {
    toggleExpansion() {
      this.opened = !this.opened;
    },
    addChord(chord) {
      this.chords.push(chord.clone());
      Setters.addChord(chord);
    },
    select(chord, action, indx) {
      switch (action) {
        case "remove":
          this.chords.splice(indx, 1);
          Setters.removeChord(indx);
          break;
        case "play":
          EventBus.$emit("play", [chord]);
          break;
        default:
          EventBus.$emit("selectChord", chord);
          break;
      }
    }
  },
  mounted() {
    const chords = Getters.chords();
    chords.forEach(chord => {
      this.chords.push(new Chord(chord));
    });
    EventBus.$on("saveChord", this.addChord);
  },
  beforeDestroy() {
    EventBus.$off("saveChord", this.addChord);
  }
};
</script>