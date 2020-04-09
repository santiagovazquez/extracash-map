import { Component } from 'react';
import MapaInteractivo from '@usig-gcba/mapa-interactivo/lib/MapaInteractivo';
import { places } from '../files/places';

export default class Map extends Component {
  componentDidMount() {
    const mapaInteractivo = new MapaInteractivo("mapa", {center: [-34.62, -58.44]});
    places.forEach(p => {
      mapaInteractivo.addMarker({ lat: p.lat, lng: p.lng }, true)
    });
  }

  render() {
    return <div id='mapa' style={{margin: -8, width: '100%', height: '100%', position: 'absolute'}}></div>
  }
}
