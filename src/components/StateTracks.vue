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
            <div class="group-content text-bold">Saved tracks</div>
          </div>
        </button>
      </div>
    </div>
    <div class="settings">
      <div class="chordbox" v-for="(track,indx) in tracks" :key="indx">
        <div class="row row-collapsed">
          <div class="col">
            <button class="btn btn-primary title" @click="select(indx)">
              {{track.name}}
            </button>
          </div>
          <div class="col col-auto">
            <button class="btn btn-primary" @click="select(indx, 'remove')" title="Delete track">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../lib/eventbus";
import { Getters, Setters } from "../lib/state";

export default {
  name: "cStateTracks",
  data() {
    return {
      opened: false,
      tracks: []
    };
  },
  methods: {
    toggleExpansion() {
      this.opened = !this.opened;
    },
    addTrack(chords) {
      let name = prompt("Track's name");
      if (!name) {
        return;
      }
      const track = {
        name: name,
        chords: []
      };
      chords.forEach(chord => {
        track.chords.push(chord.state);
      });
      this.tracks.push(track);
      Setters.addTrack(track);
    },
    select(indx, action) {
        if (action === 'remove') {
            this.tracks.splice(indx, 1);
            Setters.removeTrack(indx);
            return;
        }
        
        EventBus.$emit("selectTrack", this.tracks[indx]);
    }
  },
  mounted() {
    this.tracks = Getters.tracks().slice(0);
    EventBus.$on("saveTrack", this.addTrack);
  },
  beforeDestroy() {
    EventBus.$off("saveTrack", this.addTrack);
  }
};
</script>