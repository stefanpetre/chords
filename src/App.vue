<template>
  <div>
    <c-player></c-player>
    <div class="row">
      <div class="col-md-6 m-g-v">
        <c-track></c-track>
      </div>
      <div class="col-md-6 m-g-v">
        <c-scale></c-scale>
        <c-state-chords></c-state-chords>
        <c-state-tracks></c-state-tracks>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>