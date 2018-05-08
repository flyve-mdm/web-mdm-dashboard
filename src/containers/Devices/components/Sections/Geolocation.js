import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../../components/Loading'
import Map from '../Map'
import GeolocationList from './GeolocationList'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'

export default class Geolocation extends PureComponent {
    constructor() {
        super()
        this.state ={
          isLoading: true,
          isLoadingGeolocation: false,
          locations: [],
          showLocations: []
        }
      }
    
    componentDidMount () {
        this.handleRefresh()
    }

    componentWillReceiveProps(newProps) {
        if (this.props.id !== newProps.id || this.props.update !== newProps.update) {
            this.setState({
                isLoading: true
            }, () => this.handleRefresh())
        }
    }

    requestLocation = async () => {
        try {
            this.setState({ isLoadingGeolocation: true})
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
            this.setState({ isLoadingGeolocation: false })
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
        }
    }

    handleRefresh = async () => {
        if (this.props.update) {
            try {
                const {computers_id} = await this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.props.id })
                const response = await this.props.glpi.getSubItems({
                    itemtype: itemtype.Computer, 
                    id: computers_id, 
                    subItemtype: itemtype.PluginFlyvemdmGeolocation
                })    
                this.setState({
                    locations: response,
                    isLoading: false,
                    isLoadingGeolocation: false
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({  
                    locations: [],
                    isLoading: false,
                    isLoadingGeolocation: false
                })
            }
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
                        <Map markers={this.state.showLocations} style={{ margin: '0 5px', height: '40%' }} />
                        <div style={{ display: 'flex', overflow: 'auto' }}>
                            <div>
                                <button className="btn btn--secondary" style={{ margin: 5 }} onClick={this.requestLocation}>
                                    {I18n.t('devices.geolocation.request_current_location')}
                                </button>
                            </div>
                            {this.state.isLoadingGeolocation ? <Loading small /> : ''}
                        </div>
                        <GeolocationList locations={this.state.locations} showLocations={this.showLocations}/>
                    </React.Fragment>
                )
    }
}

Geolocation.propTypes = {
    id: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    update: PropTypes.bool.isRequired    
}