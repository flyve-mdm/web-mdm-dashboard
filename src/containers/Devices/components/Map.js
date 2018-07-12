/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

/** set icons leaflet */
/* eslint no-underscore-dangle: ["error", { "allow": ["_getIconUrl"] }] */
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  /* eslint-disable global-require */
  iconRetinaUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../../node_modules/leaflet/dist/images/marker-shadow.png'),
})

/**
 * @class Map
 * @extends PureComponent
 */
class Map extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      map: undefined,
      markerGroup: undefined,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      const map = L.map('map', {
        minZoom: 1,
        maxZoom: 18,
        center: [30.481913, 6.499247],
        zoom: 1,
        layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        })],
        attributionControl: true,
        preferCanvas: true,
      })
      this.setState({
        map,
        markerGroup: L.layerGroup().addTo(map),
      }, () => this.addMarkers())
    }, 0)
  }

  componentDidUpdate = (prevProps) => {
    const { map } = this.state
    const { selectedLocation } = this.props

    if (map) {
      this.addMarkers()
      if (prevProps.selectedLocation !== selectedLocation) {
        map.setZoom(10)
        map.panTo([
          selectedLocation.latitude,
          selectedLocation.longitude,
        ])
      }
    }
  }

  /**
   * handle add mark to location
   * @function addMarkers
   */
  addMarkers = () => {
    const {
      markerGroup,
      map,
    } = this.state
    const { markers } = this.props

    markerGroup.clearLayers()
    for (let index = 0; index < markers.length; index += 1) {
      L.marker([
        markers[index].latitude,
        markers[index].longitude,
      ]).addTo(markerGroup)
    }
    if (markers[0]) {
      map.setZoom(10)
      map.panTo(
        new L.LatLng(
          markers[markers.length - 1].latitude,
          markers[markers.length - 1].longitude,
        ),
      )
    }
  }

  render() {
    const { style } = this.props

    return <div id="map" style={{ ...style, zIndex: 0 }} />
  }
}
/** Map defaultProps */
Map.defaultProps = {
  style: {
    height: '40%',
  },
  markers: [],
  selectedLocation: null,
}
/** Map propTypes */
Map.propTypes = {
  style: PropTypes.object,
  markers: PropTypes.array,
  selectedLocation: PropTypes.object,
}

export default Map
