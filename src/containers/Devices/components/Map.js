import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../../node_modules/leaflet/dist/images/marker-shadow.png')
})

class Map extends Component {
    constructor (props) {
        super(props)
        this.state = {
            map: undefined,
            markerGroup: undefined
        }
    }

    addMarkers = () => {
        this.state.markerGroup.clearLayers()
        for (let index = 0; index < this.props.markers.length; index++) {
            L.marker([
                this.props.markers[index].latitude, 
                this.props.markers[index].longitude
            ]).addTo(this.state.markerGroup)
        }
        if (this.props.markers[0]) {
            this.state.map.setZoom(10)
            this.state.map.panTo(
                new L.LatLng(
                    this.props.markers[this.props.markers.length - 1].latitude, 
                    this.props.markers[this.props.markers.length - 1].longitude
                )
            )
        }
    }

    componentDidMount () {
        setTimeout(() => { 
            const map = L.map('map', {
                minZoom: 1,
                maxZoom: 18,
                center: [30.481913, 6.499247],
                zoom: 1,
                layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
                attributionControl: true,
                preferCanvas: true,
            })
            this.setState({ 
                map, 
                markerGroup: L.layerGroup().addTo(map)
            }, () => this.addMarkers())
        }, 0)
    }

    componentDidUpdate = () => {
        if (this.state.map) {
            this.addMarkers()
        }
    }

    render () {
        return <div id="map" style={{...this.props.style, zIndex: 0}} />
    }
}

Map.defaultProps = {
    style: { height: '40%' },
    markers: []
}


Map.propTypes = {
    style: PropTypes.object,
    markers: PropTypes.array
}

export default Map