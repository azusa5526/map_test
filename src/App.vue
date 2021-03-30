<template>
  <div id="app">
    <div class="container">
      <div class="google-map" id="map"></div>
      <div>Zoom Level： {{ zoomLevel }}</div>
      <button class="btn btn-outline-secondary mb-2 me-2" @click="hideTxtContent()">
        hide txt content
      </button>
      <button class="btn btn-outline-secondary mb-2 me-2" @click="showTxtContent()">
        show txt content
      </button>
      <button class="btn btn-outline-secondary mb-2 me-2" @click="removeTxtContent()">
        remove txt content
      </button>
      <button class="btn btn-outline-secondary mb-2 me-2" @click="addTxtContent()">
        add txt content
      </button>
      <button class="btn btn-outline-secondary mb-2 me-2" @click="toggleTxtContent()">
        toggle txt content
      </button>
    </div>
  </div>
</template>

<script>
import TxtOverlay from '@/assets/txtOverlay.js';

export default {
  name: 'App',
  components: {},

  data() {
    return {
      google: null,
      map: null,
      features: [],
      center: { lat: 24.99721088559984, lng: 121.16098520533231 },
      paths: [
        { lat: 24.802182280179526, lng: 120.97310435606073 },
        { lat: 24.801710797338675, lng: 120.97214348517628 },
        { lat: 24.800708890349018, lng: 120.97214348517628 },
        { lat: 24.80023740190553, lng: 120.97307838657736 },
        { lat: 24.800744251910007, lng: 120.97402627272027 },
        { lat: 24.80169901024468, lng: 120.97401328797855 }
      ],
      zoomLevel: '',
      overlayViewCollection: []
    };
  },

  methods: {
    initMap() {
      this.google = window.google;
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: this.center,
        zoom: 16,
        maxZoom: 20,
        minZoom: 12,
        streetViewControl: false,
        mapTypeControl: false
      });
    },

    addfeature() {
      this.features.push(
        {
          position: new this.google.maps.LatLng(24.802182280179526, 120.97310435606073),
          icon: {
            url: require('@/assets/strengthen.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '強化系：增強自己或武器本來的性質。可將攻擊、防守和療傷等能力發揮到極致的系。'
        },
        {
          position: new this.google.maps.LatLng(24.801710797338675, 120.97214348517628),
          icon: {
            url: require('@/assets/exhaust.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '放出系：氣在身體以外仍可以保持威力，可以發到遠離身體的地方。將身體的氣放出。'
        },
        {
          position: new this.google.maps.LatLng(24.800708890349018, 120.97214348517628),
          icon: {
            url: require('@/assets/control.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '操作系：可將自身的念注入物件從而控制之（如注入他人體內，可控制他人）。'
        },
        {
          position: new this.google.maps.LatLng(24.80023740190553, 120.97307838657736),
          icon: {
            url: require('@/assets/especial.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '不屬於以上五系的念能力皆分為此類。'
        },
        {
          position: new this.google.maps.LatLng(24.800744251910007, 120.97402627272027),
          icon: {
            url: require('@/assets/realization.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '具現化系：可將自己的氣的形態改造成自己想要的東西，即將氣實物化。'
        },
        {
          position: new this.google.maps.LatLng(24.80169901024468, 120.97401328797855),
          icon: {
            url: require('@/assets/variety.png'), // url
            scaledSize: new this.google.maps.Size(70, 70), // scaled size
            origin: new this.google.maps.Point(0, 0), // origin
            anchor: new this.google.maps.Point(30, 30) // anchor
          },
          message: '變化系：可將產生的氣的形狀以及性質改變。'
        }
      );
    },

    addMarkers() {
      for (let i = 0; i < this.features.length; i++) {
        // eslint-disable-next-line no-unused-vars
        const marker = new this.google.maps.Marker({
          position: this.features[i].position,
          icon: this.features[i].icon,
          map: this.map
        });

        const infowindow = new this.google.maps.InfoWindow({
          content: `
          <div id="content">
            <p>${this.features[i].message}</p>
          </div>
        `,
          maxWidth: 200
        });
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
        });
      }
    },

    addPolygon() {
      const hex = new this.google.maps.Polygon({
        paths: this.paths,
        strokeColor: '#b3023a',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        fillColor: '#f7a4c0',
        fillOpacity: 0.35
      });
      hex.setMap(this.map);
    },

    addTxtContent() {
      const jsonData = require('./assets/jsonData0.json');

      for (let i = 0; i < jsonData.features.length; i++) {
        const customTxt = `<span>${jsonData.features[i].properties.Sys_cns}123123</span>`;
        const latlng = new this.google.maps.LatLng(
          jsonData.features[i].geometry.coordinates[0][1],
          jsonData.features[i].geometry.coordinates[0][0]
        );

        this.overlayViewCollection.push(new TxtOverlay(latlng, customTxt, 'txtOverlay', this.map));
      }
    },

    removeTxtContent() {
      this.overlayViewCollection.forEach((item) => {
        item.setMap(null);
      });
    },

    toggleTxtContent() {
      this.overlayViewCollection.forEach((item) => {
        item.toggleDOM(null);
      });
    },

    showTxtContent() {
      const txtElementCollection = document.querySelectorAll('.txtOverlay');
      txtElementCollection.forEach((item) => {
        item.classList.add('showTxtContent');
      });

      // this.overlayViewCollection.forEach((item) => {
      //   item.show();
      // });
    },

    hideTxtContent() {
      const txtElementCollection = document.querySelectorAll('.txtOverlay');
      txtElementCollection.forEach((item) => {
        item.classList.remove('showTxtContent');
      });

      // this.overlayViewCollection.forEach((item) => {
      //   item.hide();
      // });
    },

    txtContentVisibiliyHandler() {
      const zoomThreshold = 17;
      if (this.zoomLevel < zoomThreshold) {
        this.hideTxtContent();
      } else {
        this.showTxtContent();
      }
    }
  },

  mounted() {
    this.initMap();
    this.addfeature();
    this.addMarkers();
    this.addPolygon();
    this.addTxtContent();

    this.map.addListener('zoom_changed', () => {
      this.zoomLevel = this.map.getZoom();
      this.txtContentVisibiliyHandler();
    });
  }
};
</script>

<style lang="scss">
.google-map {
  width: 100%;
  height: 600px;
}

.txtOverlay {
  background: rgb(95, 95, 95);
  color: white;
  position: absolute;
  display: none;
  white-space: nowrap;
  font-size: 14px;
  padding: 4px 8px;
}

.showTxtContent {
  display: block !important;
}
</style>
