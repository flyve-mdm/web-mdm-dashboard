import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../node_modules/leaflet/dist/images/marker-shadow.png')
})

class Map extends Component {

    constructor (props) {
        super(props)
        this.state = {
            map: undefined
        }
    }

    componentDidMount () {
        const map = L.map('map', {
            minZoom: 2,
            maxZoom: 18,
            center: [10.2484425 , -67.5906903],
            zoom: 2,
            layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
            attributionControl: true,
            preferCanvas: true,
        })

        // let marker = L.marker(this.state.position).addTo(map)
        // marker.bindPopup("last known location")
        return this.setState({ map })
    }

    render () {
        return <div id="map" style={this.props.style} />
    }
}

Map.defaultProps = {
    style: { height: '250px' }
}


Map.propTypes = {
    style: PropTypes.object
}

export default Map