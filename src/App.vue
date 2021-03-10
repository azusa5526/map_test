<template>
  <div id="app">
    <div class="container">
      <GmapMap id="map" ref="mapRef" :center="center" :options="mapOptions" :style="mapStyle">
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
        <gmap-polygon :paths="paths"></gmap-polygon>
      </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},

  data() {
    return {
      center: { lat: 24.799989869755034, lng: 120.97194222168014 },
      paths: [
        [
          { lat: 24.79861519505178, lng: 120.98133084232963 },
          { lat: 24.79861519505178, lng: 120.98233084232963 },
          { lat: 24.79961519505178, lng: 120.98233084232963 },
          { lat: 24.79961519505178, lng: 120.98133084232963 }
        ],
        [
          { lat: 24.802182280179526, lng: 120.97310435606073 },
          { lat: 24.801710797338675, lng: 120.97214348517628 },
          { lat: 24.800708890349018, lng: 120.97214348517628 },
          { lat: 24.80023740190553, lng: 120.97307838657736 },
          { lat: 24.800744251910007, lng: 120.97402627272027 },
          { lat: 24.80169901024468, lng: 120.97401328797855 }
        ]
      ]
    };
  },

  computed: {
    mapOptions() {
      return {
        zoom: 16,
        mapTypeId: 'terrain'
      };
    },
    mapStyle() {
      return {
        width: '100%',
        height: 500 + 'px'
      };
    }
  }
};
</script>

<style lang="scss">
</style>
