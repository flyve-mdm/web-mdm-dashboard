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

import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import YEARS from './years'
import MONTHS from './months'
import DAYS from './days'
import monthsList from './monthsList.json'

/**
 * Component to create a date picker
 * @class DatePicker
 * @extends PureComponent
 */
class DatePicker extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const date = new Date(this.props.value)
    this.state = {
      year: this.props.value ? date.getFullYear() : null,
      month: this.props.value ? monthsList[date.getMonth()] : null,
      day: this.props.value ? date.getDate() : null,
    }
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    const currentDate = new Date()
    const newDate = {
      year: this.state.year ? this.state.year : currentDate.getFullYear(),
      month: this.state.month ? this.state.month : monthsList[currentDate.getMonth()],
      day: this.state.day ? this.state.day : 1,
    }

    newDate[eventObject.target.name] = eventObject.target.value

    this.setState({ ...newDate },
      this.props.function(this.props.name, new Date(`${newDate.year} ${newDate.month} ${newDate.day}`)))
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="froms__col">
        <p>
          {this.props.label}
        </p>

        <div className="win-disposable win-datepicker">
          <select
            required={this.props.required}
            className="win-datepicker-month win-order0"
            name="month"
            value={this.state.month}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { MONTHS() }
          </select>

          <select
            className="win-datepicker-date win-order1"
            name="day"
            value={this.state.day}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { DAYS(this.state.year, this.state.month) }
          </select>

          <select
            className="win-datepicker-year win-order2"
            name="year"
            value={this.state.year}
            onChange={this.change}
          >
            <option>
              ---
            </option>
            { YEARS() }
          </select>
        </div>
      </div>
    )
  }
}

DatePicker.defaultProps = {
  required: false,
  value: null,
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.instanceOf(Date),
  function: PropTypes.func.isRequired,
  required: PropTypes.bool,
}

export default DatePicker
