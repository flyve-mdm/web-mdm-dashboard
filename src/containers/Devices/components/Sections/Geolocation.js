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
import {
  I18n,
} from 'react-i18nify'
import Loading from '../../../../components/Loading'
import Map from '../Map'
import GeolocationList from './GeolocationList'
import itemtype from '../../../../shared/itemtype'
import GeolocationRange from './GeolocationRange'
import validateDate from '../../../../shared/validateDate'

/**
 * @class Geolocation
 * @extends PureComponent
 */
export default class Geolocation extends PureComponent {
  constructor(props) {
    super(props)
    const {
      id,
      update,
    } = this.props

    this.state = {
      id,
      update,
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
    const {
      id,
      update,
    } = this.state

    if (prevState.id !== id || prevState.update !== update) {
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
    const { locations } = this.state

    this.setState({
      showLocations: locations.filter(location => validateDate(new Date(location.date), min, max)),
    })
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
    const {
      glpi,
      setNotification,
      handleMessage,
    } = this.props
    const { id } = this.state

    try {
      this.setState({
        isLoadingGeolocation: true,
      })
      await glpi.updateItem({
        id,
        itemtype: itemtype.PluginFlyvemdmAgent,
        input: {
          _geolocate: '',
        },
      })
      setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.request_sent'),
        type: 'success',
      })
      this.handleRefresh()
    } catch (error) {
      this.setState({
        isLoadingGeolocation: false,
      })
      setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
    }
  }

  /**
   * handle refresh locations
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    const {
      update,
      id,
    } = this.state
    const {
      glpi,
      setNotification,
      handleMessage,
    } = this.props

    if (update) {
      try {
        const {
          computers_id: computersID,
        } = await glpi.getAnItem({
          id,
          itemtype: itemtype.PluginFlyvemdmAgent,
        })
        const response = await glpi.getSubItems({
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
        setNotification(handleMessage({
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
    const {
      isLoading,
      showLocations,
      selectedLocation,
      filter,
      isLoadingGeolocation,
      locations,
    } = this.state

    return isLoading
      ? <Loading message={`${I18n.t('commons.loading')}...`} />
      : (
        <React.Fragment>
          <Map
            markers={showLocations}
            style={{ margin: '0 5px', height: '300px', maxWidth: '800px' }}
            selectedLocation={selectedLocation}
          />
          <button
            className="btn btn--secondary"
            style={{ margin: 5 }}
            onClick={() => this.setState({
              filter: !filter,
            })}
            type="button"
          >
            {
              filter
                ? I18n.t('devices.geolocation.hide_filter')
                : I18n.t('devices.geolocation.filter_range')
            }
          </button>
          <div style={{ display: 'inline-block' }}>
            <button
              className="btn btn--secondary"
              style={{ margin: 5 }}
              onClick={this.requestLocation}
              type="button"
            >
              {I18n.t('devices.geolocation.request_current_location')}
            </button>
            {
              isLoadingGeolocation
                ? <Loading small style={{ paddingBottom: '20px' }} />
                : ''
            }
          </div>

          {
            filter
              ? <GeolocationRange applyRange={this.applyRange} />
              : ''
          }

          <GeolocationList
            locations={locations}
            showLocation={this.showLocation}
            goToLocation={this.goToLocation}
            markers={showLocations}
          />
        </React.Fragment>
      )
  }
}
/** Geolocation propTypes */
Geolocation.propTypes = {
  id: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
}
