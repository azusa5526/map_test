import Vue from 'vue';
import App from './App.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
// import GmapCustomMarker from 'vue2-gmap-custom-marker';

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-T-Ztg8-D0FElC2YiuAcuYIo3ec29ukE',
    libraries: 'places,drawing' // This is required if you use the Autocomplete plugin
  }
});

// Vue.component('gmap-custom-marker', GmapCustomMarker);

new Vue({
  render: (h) => h(App)
}).$mount('#app');
