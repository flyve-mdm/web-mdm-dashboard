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

/**
 * @class GeolocationList
 * @extends PureComponent
 */
class GeolocationList extends PureComponent {
  render() {
    let renderList
    if (this.props.locations.length > 0) {
      renderList = this.props.locations.map((location, index) => (
        <div
          key={`location-${index.toString()}`}
          style={{ paddingLeft: 5, cursor: 'pointer' }}
          onClick={() => this.props.goToLocation(location)}
          role="button"
          tabIndex="0"
        >
          <label
            style={{ cursor: 'pointer' }}
            htmlFor={`location-${index.toString()}`}
          >
            <input
              id={`location-${index.toString()}`}
              type="checkbox"
              className="win-checkbox"
              style={{ width: 'auto', cursor: 'pointer' }}
              onChange={() => this.props.showLocation(location)}
              checked={(this.props.markers.indexOf(location) !== -1)}
            />
            { location.date }
          </label>
        </div>
      ))
    } else {
      renderList = (
        <p style={{ color: 'grey', marginLeft: 5 }}>
          {I18n.t('devices.geolocation.no_locations')}
        </p>
      )
    }
    return renderList
  }
}
/** GeolocationList defaultProps */
GeolocationList.defaultProps = {
  locations: [],
  markers: [],
}
/** GeolocationList propTypes */
GeolocationList.propTypes = {
  locations: PropTypes.array,
  showLocation: PropTypes.func.isRequired,
  markers: PropTypes.array,
  goToLocation: PropTypes.func.isRequired,
}

export default GeolocationList
