<template>
  <div class="key" :class="{black: note.key.length > 1}">
    {{note.key}}<template v-if="octave">{{note.octave}}</template>
  </div>
</template>

<script>
export default {
  name: "cNoteKey",
  props: {
    note: {},
    octave: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>