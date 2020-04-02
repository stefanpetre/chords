<template>
  <div class="dropdown" @click="click" :class="{'dropdown-open': opened}">
    <a href="#" data-dropdown-trigger class="btn btn-white">
      <div class="group group-inline">
        <div class="group-content">{{value.name}}</div>
        <div class="group-addon">
          <i class="mdi mdi-chevron-down"></i>
        </div>
      </div>
    </a>
    <div class="dropdown-container bg-white p-hg elevation-9">
      <ul class="nav">
        <li v-for="type in types" :key="type.type">
          <a href="#" :data-type="type.type">{{type.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import scales from "../data/scales";

export default {
  name: "cScalePicker",
  props: ["value"],
  data() {
    return {
      types: [],
      opened: false
    };
  },
  methods: {
    select(note) {
      this.$emit("select", note);
      this.$emit("input", false);
    },
    close() {
      this.$emit("input", false);
    },
    click(ev) {
      const target = ev.target.closest(".dropdown-container");
      if (target) {
        ev.stopPropagation();
      }
      ev.preventDefault();
      this.opened = !this.opened;
      
      if (ev.target.dataset.type) {
          const type = scales[ev.target.dataset.type];
          type.type = ev.target.dataset.type;
          this.$emit('input', type);
      }
    }
  },
  beforeMount() {
    for (let type in scales) {
      scales[type].type = type;
      this.types.push(scales[type]);
    }
  }
};
</script>