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
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import validateDate from 'shared/validateDate'
import Loading from 'components/Loading'
import GeolocationList from './GeolocationList'
import GeolocationRange from './GeolocationRange'
import Map from '../Map'

/**
 * @class Geolocation
 * @extends PureComponent
 */
export default class Geolocation extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      update: this.props.update,
      isLoading: true,
      isLoadingGeolocation: false,
      locations: [],
      showLocations: [],
      selectedLocation: undefined,
      filter: false,
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
      this.handleRefresh()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
      return {
        ...prevState,
        id: nextProps.id,
        update: nextProps.update,
        isLoading: true,
        isLoadingGeolocation: false,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Set date range to get locations
   * @function applyRange
   * @param {date}
   * @param {date}
   */
  applyRange = (min, max) => {
    this.setState(prevState => ({
      showLocations: prevState.locations.filter(location => validateDate(new Date(location.date), min, max)),
    }))
  }

  /**
   * Show locations
   * @function showLocation
   * @param {location}
   */
  showLocation = (location) => {
    const { showLocations } = this.state
    const showLocationsCopy = showLocations.map(element => element)
    const index = showLocationsCopy.map(e => e.id).indexOf(location.id)
    if (index === -1) {
      showLocationsCopy.push(location)
    } else {
      showLocationsCopy.splice(index, 1)
    }
    this.setState({
      showLocations: showLocationsCopy,
    })
  }

  /**
   * handle request locations
   * @async
   * @function requestLocation
   */
  requestLocation = async () => {
    try {
      this.setState({
        isLoadingGeolocation: true,
      })
      await this.props.glpi.updateItem({
        id: this.state.id,
        itemtype: itemtype.PluginFlyvemdmAgent,
        input: {
          _geolocate: '',
        },
      })
      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.request_sent'),
        type: 'success',
      })
      this.handleRefresh()
    } catch (error) {
      this.setState({
        isLoadingGeolocation: false,
      })
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
        displayErrorPage: false,
      }))
    }
  }

  /**
   * handle refresh locations
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    if (this.state.update) {
      try {
        const {
          computers_id: computersID,
        } = await this.props.glpi.getAnItem({
          id: this.state.id,
          itemtype: itemtype.PluginFlyvemdmAgent,
        })
        const response = await this.props.glpi.getSubItems({
          itemtype: itemtype.Computer,
          id: computersID,
          subItemtype: itemtype.PluginFlyvemdmGeolocation,
        })
        this.setState({
          locations: response,
          showLocations: [],
          isLoading: false,
          isLoadingGeolocation: false,
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
        this.setState({
          locations: [],
          showLocations: [],
          isLoading: false,
          isLoadingGeolocation: false,
        })
      }
    }
  }

  /**
   * handle go to selected location
   * @function goToLocation
   * @param {object} selectedLocation
   */
  goToLocation = selectedLocation => this.setState({
    selectedLocation,
  })

  render() {
    return this.state.isLoading
      ? <Loading message={`${I18n.t('commons.loading')}...`} />
      : (
        <div className="geolocation">
          <Map
            markers={this.state.showLocations}
            style={{ height: '300px', maxWidth: '800px' }}
            selectedLocation={this.state.selectedLocation}
          />
          <button
            className="btn btn--secondary"
            onClick={() => this.setState(prevState => ({
              filter: !prevState.filter,
            }))}
            type="button"
          >
            {
              this.state.filter
                ? I18n.t('devices.geolocation.hide_filter')
                : I18n.t('devices.geolocation.filter_range')
            }
          </button>
          <div style={{ display: 'inline-block' }}>
            <button
              className="btn btn--secondary"
              onClick={this.requestLocation}
              type="button"
            >
              {I18n.t('devices.geolocation.request_current_location')}
            </button>
            {
              this.state.isLoadingGeolocation
                ? <Loading small style={{ paddingBottom: '20px' }} />
                : ''
            }
          </div>

          {
            this.state.filter
              ? <GeolocationRange applyRange={this.applyRange} />
              : ''
          }

          <GeolocationList
            locations={this.state.locations}
            showLocation={this.showLocation}
            goToLocation={this.goToLocation}
            markers={this.state.showLocations}
          />
        </div>
      )
  }
}
/** Geolocation propTypes */
Geolocation.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
}
