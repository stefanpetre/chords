<template>
  <div class="modal" :class="{'d-xs-block': value}">
    <div class="container-sm">
      <div class="p-g m-g rounded bg-grey-sl elevation-4 color-sl">
        <h3 class="text-bold">Choose a key</h3>
        <div class="m-g-v">
          <c-piano-roll :keys="notes" :interactive="true" @select="select"></c-piano-roll>
        </div>
        <button class="btn btn-primary" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import keys from "../data/keys";
import Note from "../lib/note";

export default {
  name: "cNotePicker",
  props: ["value"],
  data() {
    return {
      notes: []
    };
  },
  methods: {
    select(note) {
      this.$emit("select", note);
      this.$emit("input", false);
    },
    close() {
      this.$emit("input", false);
    }
  },
  mounted() {
    keys.forEach(key => {
      this.notes.push(new Note(key));
    });
  }
};
</script>