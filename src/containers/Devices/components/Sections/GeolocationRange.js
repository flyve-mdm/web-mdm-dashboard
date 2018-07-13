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
import I18n from '../../../../shared/i18n'
import {
  DatePicker,
} from '../../../../components/Forms'

/**
 * @class GeolocationRange
 * @extends PureComponent
 */
export default class GeolocationRange extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      min: this.props.min,
      max: this.props.max,
    }
  }

  /**
   * handle change date range
   * @function changeRange
   * @param {string} name
   * @param {date} value
   */
  changeRange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <p>
          {I18n.t('devices.geolocation.filter_range')}
        </p>
        <DatePicker
          label={I18n.t('commons.min')}
          name="min"
          function={this.changeRange}
          value={this.state.min}
        />
        <DatePicker
          label={I18n.t('commons.max')}
          name="max"
          function={this.changeRange}
          value={this.state.max}
        />
        <button
          className="btn btn--primary"
          style={{ margin: '20px 0' }}
          onClick={() => this.props.applyRange(
            this.state.min,
            this.state.max,
          )}
          type="button"
        >
          {I18n.t('commons.filter')}
        </button>
      </React.Fragment>
    )
  }
}

GeolocationRange.defaultProps = {
  min: undefined,
  max: undefined,
}

/** GeolocationRange propTypes */
GeolocationRange.propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  applyRange: PropTypes.func.isRequired,
}
