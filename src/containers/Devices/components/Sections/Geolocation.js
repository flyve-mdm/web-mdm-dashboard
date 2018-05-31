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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../../components/Loading'
import Map from '../Map'
import GeolocationList from './GeolocationList'
import { I18n } from "react-i18nify"
import itemtype from '../../../../shared/itemtype'
import GeolocationRange from './GeolocationRange'
import validateDate from '../../../../shared/validateDate'

export default class Geolocation extends PureComponent {
    constructor(props) {
        super(props)
        this.state ={
            id: this.props.id,
            update: this.props.update,
            isLoading: true,
            isLoadingGeolocation: false,
            locations: [],
            showLocations: [],
            selectedLocation: undefined,
            filter: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
            return {
                ...prevState,
                id: nextProps.id,
                update: nextProps.update,
                isLoading: true,
                isLoadingGeolocation: false
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    applyRange = (min, max) => {
        this.setState({
            showLocations: this.state.locations.filter(location => validateDate(new Date(location.date), min, max))
        })
    }

    showLocation = (location) => {
        let showLocations = this.state.showLocations.map(element => element)
        const index = showLocations.map((e) => { return e.id }).indexOf(location.id)
        if (index === -1) {
            showLocations.push(location)
        } else {
            showLocations.splice(index, 1)
        }
        this.setState({ showLocations })
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
            this.handleRefresh()
        }
    }

    componentDidMount () {
        this.handleRefresh()
    }

    requestLocation = async () => {
        try {
            this.setState({ isLoadingGeolocation: true})
            await this.props.glpi.updateItem({
                itemtype: itemtype.PluginFlyvemdmAgent,
                id: this.state.id,
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
        if (this.state.update) {
            try {
                const {computers_id} = await this.props.glpi.getAnItem({ itemtype: itemtype.PluginFlyvemdmAgent, id: this.state.id })
                const response = await this.props.glpi.getSubItems({
                    itemtype: itemtype.Computer,
                    id: computers_id,
                    subItemtype: itemtype.PluginFlyvemdmGeolocation
                })
                this.setState({
                    locations: response,
                    showLocations: [],
                    isLoading: false,
                    isLoadingGeolocation: false
                })
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                this.setState({
                    locations: [],
                    showLocations: [],
                    isLoading: false,
                    isLoadingGeolocation: false
                })
            }
        }
    }

    goToLocation = (selectedLocation) => this.setState({ selectedLocation })

    render() {
        return this.state.isLoading ? 
            <Loading message={`${I18n.t('commons.loading')}...`} /> : 
                (   
                    <React.Fragment>
                        <Map
                            markers={this.state.showLocations}
                            style={{ margin: '0 5px', height: '300px', maxWidth: '800px' }}
                            selectedLocation={this.state.selectedLocation}
                        />
                        <button
                            className="btn btn--secondary"
                            style={{ margin: 5 }}
                            onClick={() => this.setState({
                                filter: !this.state.filter
                            })}
                        >
                            {
                                this.state.filter ?
                                    I18n.t('devices.geolocation.hide_filter'):
                                    I18n.t('devices.geolocation.filter_range')
                            }
                        </button>
                        <div style={{display: 'inline-block'}}>
                            <button className="btn btn--secondary" style={{ margin: 5 }} onClick={this.requestLocation}>
                                {I18n.t('devices.geolocation.request_current_location')}
                            </button>
                            {this.state.isLoadingGeolocation ? <Loading small style={{paddingBottom: '20px'}} /> : ''}
                        </div>

                        {
                            this.state.filter ?
                                <GeolocationRange applyRange={this.applyRange} /> : ''
                        }

                        <GeolocationList
                            locations={this.state.locations}
                            showLocation={this.showLocation}
                            goToLocation={this.goToLocation}
                            markers={this.state.showLocations}
                        />
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