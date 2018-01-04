import React, { Component } from 'react'
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../../node_modules/leaflet/dist/images/marker-shadow.png')
})

export default class Geolocation extends Component {
    constructor() {
        super();
        this.state ={
          map: null,
          position: [51.505, -0.09],
        };
      }
    
      componentDidMount() {
        setTimeout(() => {
            var map = L.map('map', {
                minZoom: 2,
                maxZoom: 20,
                center: this.state.position,
                zoom: 13,
                layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
                attributionControl: true,
                preferCanvas: true,
            });
            L.marker(this.state.position).addTo(map);
            return this.setState({
                map: map
            });
        }, 100)
      }

    render() {
        return (
            <div id="map" style={{ height: '400px' }}></div>
        )
    }
}
