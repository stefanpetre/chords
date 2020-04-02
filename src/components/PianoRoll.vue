<template>
  <div class="pianoroll" :class="{interactive: interactive}">
    <c-note-key v-for="(note, indx) in keys" :key="indx" :note="note" @click.native="click(note)" :octave="octave"></c-note-key>
  </div>
</template>

<script>

export default {
  name: "cPianoRoll",
  props: {
      keys: {
          type: Array,
          default: []
      },
      interactive: {
          type: Boolean,
          default: false
      },
      octave: {
          type: Boolean,
          default: false
      }
  },
  data() {
    return {};
  },
  methods: {
      click(note) {
          if (!this.interactive) {
              return;
          }
          this.$emit('select', note);
      }
  }
};
</script>