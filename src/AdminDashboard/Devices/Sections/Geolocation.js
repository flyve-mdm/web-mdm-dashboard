import React, { Component } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Loading from '../../../Utils/Loading'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('../../../../node_modules/leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('../../../../node_modules/leaflet/dist/images/marker-shadow.png')
})

export default class Geolocation extends Component {
    constructor() {
        super()
        this.state ={
          map: null,
          position: [10.2484425 , -67.5906903],
          isLoading: true,
          locations: []
        }
      }
    
    componentDidMount () {
        this.handleRefresh()
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.selectedItemList !== prevProps.selectedItemList) {
            this.setState({isLoading: true}, () => this.handleRefresh())
        }
    }

    requestLocation = async () => {
        try {
            await this.props.glpi.updateItem({
                itemtype: 'PluginFlyvemdmAgent', 
                id: this.props.selectedItemList[0]['PluginFlyvemdmAgent.id'],
                input: {_geolocate: ""}
            })
            this.props.showNotification('Success', 'Request sent')
            this.handleRefresh()
        } catch (error) {
            this.props.showNotification(error[0], error[1])
        }
    }

    handleRefresh = async () => {
        try {
            const response = await this.props.glpi.getSubItems({
                itemtype: 'Computer', 
                id: this.props.selectedItemList[0]['PluginFlyvemdmAgent.Computer.id'], 
                subItemtype: 'PluginFlyvemdmGeolocation'
            })
    
            this.setState({
                locations: response,
                isLoading: false
            })
        } catch (e) {
            this.props.showNotification('Error','Problems loading data')
            this.setState({  
                isLoading: false 
            })
        }
        const map = L.map('map', {
            minZoom: 2,
            maxZoom: 18,
            center: this.state.position,
            zoom: 16,
            layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})],
            attributionControl: true,
            preferCanvas: true,
        })
        // let marker = L.marker(this.state.position).addTo(map)
        // marker.bindPopup("last known location")
        return this.setState({ map })
    }

    render() {
        return this.state.isLoading ? 
            <Loading message="Loading..." /> : 
                (   
                    <React.Fragment>
                        <div id="map" style={{ height: '250px' }} />
                        <button className="win-button win-button-primary" style={{margin: 5}} onClick={this.requestLocation}>
                            Request current location
                        </button>
                    </React.Fragment>
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