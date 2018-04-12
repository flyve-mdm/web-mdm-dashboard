import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../../components/Loading'
import Map from '../Map'
import GeolocationList from './GeolocationList'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'

export default class Geolocation extends Component {
    constructor() {
        super()
        this.state ={
          isLoading: true,
          locations: [],
          showLocations: []
        }
      }
    
    componentDidMount () {
        this.handleRefresh()
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id) {
            this.setState({
                isLoading: true
            }, () => this.handleRefresh())
        }
    }

    requestLocation = async () => {
        try {
            await this.props.glpi.updateItem({
                itemtype: itemtype.PluginFlyvemdmAgent, 
                id: this.props.id,
                input: {_geolocate: ""}
            })
            this.props.setNotification({
                title: I18n.t('commons.success'),
                body: I18n.t('notifications.request_sent'),
                type: 'success'
            })
            this.handleRefresh()
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
        }
    }

    handleRefresh = async () => {
        try {
            const {computers_id} = await this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.props.id })
            const response = await this.props.glpi.getSubItems({
                itemtype: itemtype.Computer, 
                id: computers_id, 
                subItemtype: itemtype.PluginFlyvemdmGeolocation
            })    
            this.setState({
                locations: response,
                isLoading: false
            })
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({  
                isLoading: false 
            })
        }
    }

    showLocations = (publicURL) => {
        let showLocations = this.state.showLocations.map(element => element)
        const index = showLocations.map((e) => { return e.id }).indexOf(publicURL.id)
        if (index === -1) {
            showLocations.push(publicURL)
        } else {
            showLocations.splice(index, 1)
        }
        this.setState({ showLocations })
    }

    render() {
        return this.state.isLoading ? 
            <Loading message={`${I18n.t('commons.loading')}...`} /> : 
                (   
                    <React.Fragment>
                        <Map markers={this.state.showLocations}/>

                        <button className="btn --primary" style={{margin: 5}} onClick={this.requestLocation}>
                            {I18n.t('devices.geolocation.request_current_location')}
                        </button>

                        <GeolocationList locations={this.state.locations} showLocations={this.showLocations}/>
                    </React.Fragment>
                )
    }
}

Geolocation.propTypes = {
    id: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}