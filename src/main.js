import style from './less/app.less';
import icon from './less/materialdesignicons.less';

import Vue from 'vue'
import App from './App.vue'

import cScale from "./components/Scale.vue";
import cChord from "./components/Chord.vue";
import cNotePicker from "./components/NotePicker.vue";
import cPianoRoll from "./components/PianoRoll.vue";
import cNoteKey from "./components/NoteKey.vue";
import cScalePicker from "./components/ScalePicker.vue";
import cTrack from "./components/Track.vue";
import cPlayer from "./components/Player.vue";
import cStateChords from "./components/StateChords.vue";
import cStateTracks from "./components/StateTracks.vue";
Vue.component('cScale', cScale);
Vue.component('cChord', cChord);
Vue.component('cNotePicker', cNotePicker);
Vue.component('cPianoRoll', cPianoRoll);
Vue.component('cNoteKey', cNoteKey);
Vue.component('cScalePicker', cScalePicker);
Vue.component('cTrack', cTrack);
Vue.component('cPlayer', cPlayer);
Vue.component('cStateChords', cStateChords);
Vue.component('cStateTracks', cStateTracks);

new Vue({
  el: '#app',
  render: h => h(App)
})
