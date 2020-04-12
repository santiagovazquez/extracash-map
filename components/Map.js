import { Component } from 'react';
import MapaInteractivo from '@usig-gcba/mapa-interactivo/lib/MapaInteractivo';
import { places } from '../files/places';

const getPosition = () => {
  return new Promise(function(resolve) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ latitude: coords.latitude.toFixed(2), longitude: coords.longitude.toFixed(2) }),
        (e) => {
          console.error(e);
          resolve({ latitude: -34.62, longitude: -58.44 });
        },
      );
    } else {
      console.error('browser does not support geolocalization');
      resolve({ latitude: -34.62, longitude: -58.44 });
    }
  });
};

export default class Map extends Component {
  componentDidMount() {

    getPosition()
      .then((coords) => {
        console.log(coords);
        const mapaInteractivo = new MapaInteractivo("mapa", {
          center: [coords.latitude, coords.longitude],
          zoomControl: true,
          attributionControl: true,
          onMarkerClick: function(markerId) {
            const p = places[markerId];
            mapaInteractivo.addPopup([p.lat, p.lng], `<div><b>${p.name}</b></div><div>${p.street} ${p.number || ''}</div>`);
          },
        });
        places.forEach((p, idx) => {
          mapaInteractivo.addMarker({ lat: p.lat, lng: p.lng }, true, false, true, false, true, { markerId: idx });
        });
      })
  }

  render() {
    return <><div id='mapa'></div>
      <style global jsx>{`
        #mapa {
          margin: -8px; 
          width: 100%; 
          height: 100%; 
          position: absolute;
        }
        .leaflet-popup-pane {
          margin-top: -30px !important;
        }

      `}</style></>
  }
}
