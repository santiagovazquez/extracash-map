import { Component } from 'react';
import MapaInteractivo from '@usig-gcba/mapa-interactivo/lib/MapaInteractivo';
import { places } from '../files/places';

export default class Map extends Component {
  componentDidMount() {
    const mapaInteractivo = new MapaInteractivo("mapa", {
      center: [-34.62, -58.44],
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
