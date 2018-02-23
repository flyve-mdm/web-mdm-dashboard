import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

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
          position: [10.2484425 , -67.5906903],
        };
      }
    
    componentDidMount() {
        setTimeout(() => {
            var map = L.map('map', {
                minZoom: 2,
                maxZoom: 18,
                center: this.state.position,
                zoom: 16,
                layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
                attributionControl: true,
                preferCanvas: true,
            });
            var marker = L.marker(this.state.position).addTo(map);
            marker.bindPopup("last known location")
            return this.setState({
                map: map
            });
        }, 500)
    }

    render() {
        return (
            <div id="map" style={{ height: '400px' }} ></div>
        )
    }
}

Geolocation.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}