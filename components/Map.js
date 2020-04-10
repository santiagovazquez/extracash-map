import { Component } from 'react';
import MapaInteractivo from '@usig-gcba/mapa-interactivo/lib/MapaInteractivo';
import { places } from '../files/places';

export default class Map extends Component {
  componentDidMount() {
    const mapaInteractivo = new MapaInteractivo("mapa", {
      center: [-34.62, -58.44],
      onMarkerClick: function(markerId) {
        const p = places[markerId];
        mapaInteractivo.addPopup([p.lat, p.lng], `<div><b>${p.name}</b></div><div>${p.street} ${p.number || ''}</div>`);
      },
    });
    places.forEach((p, idx) => {
      // latlng: Object, visible: boolean, draggable: boolean, goTo: boolean, activate: boolean, clickable: boolean, options: Object
      mapaInteractivo.addMarker({ lat: p.lat, lng: p.lng }, true, false, true, false, true, { markerId: idx });
    });

  }

  render() {
    return <div id='mapa' style={{margin: -8, width: '100%', height: '100%', position: 'absolute'}}></div>
  }
}
