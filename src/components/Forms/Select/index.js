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

/**
 * Component to create a select input
 * @class Select
 * @extends PureComponent
 */
class Select extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      options: this.props.options,
    }
  }

  /** Validate the needs of the list of options */
  componentDidMount = () => {
    if (this.props.glpi && this.props.request) {
      this.listRequest()
    } else {
      this.handleRefresh(this.state.options)
    }
  }

  /**
   * Return the name and value to the father
   * @function change
   * @param {object} eventObject
   */
  change = (eventObject) => {
    this.props.function(this.props.name, eventObject.target.value)
  }

  /**
   * Make the necessary requests to glpi
   * @async
   * @function listRequest
   */
  listRequest = async () => {
    const options = []
    let response = await this.props.glpi[this.props.request.method](this.props.request.params)

    switch (this.props.request.method) {
      case 'getMyProfiles':
        response.myprofiles.forEach((element) => {
          options.push({
            content: element[this.props.request.content],
            value: element[this.props.request.value],
          })
        })
        break

      case 'searchItems':
        if (response.data) {
          if (response.totalcount !== response.count) {
            const params = {
              itemtype: this.props.request.params.itemtype,
              options: {
                ...this.props.request.params.options,
                range: `0-${response.totalcount - 1}`,
              },
            }
            response = await this.props.glpi[this.props.request.method](params)
          }

          response.data.forEach((element) => {
            options.push({
              content: element[this.props.request.content],
              value: element[this.props.request.value],
            })
          })
        }
        break
      case 'getAllItems':
        if (response) {
          response.forEach((element) => {
            options.push({
              content: element[this.props.request.content],
              value: element[this.props.request.value],
            })
          })
        }
        break

      case 'getSubItems':
        response.forEach((element) => {
          options.push({
            content: element[this.props.request.content],
            value: element[this.props.request.value],
          })
        })
        break
      case 'getMyEntities':
        response.myentities.forEach((element) => {
          options.push({
            content: element[this.props.request.content],
            value: element[this.props.request.value],
          })
        })
        break
      default:
        break
    }

    this.setState({
      options,
    })
  }

  /**
   * Update the list of options
   * @async
   * @function handleRefresh
   */
  handleRefresh = async (options) => {
    const optionsList = []
    options.forEach((element) => {
      if (!element.name) {
        optionsList.push({
          value: element,
          content: element,
        })
      } else {
        optionsList.push({
          value: element.value,
          content: element.name,
        })
      }
    })
    this.setState({
      options: optionsList,
    })
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
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.change}
          required={this.props.required}
        >
          <option>
            ---
          </option>
          {
            this.state.options.map((element, index) => (
              <option value={element.value} key={`${this.props.name}${index.toString()}`}>
                { element.content }
              </option>
            ))
          }
        </select>
      </div>
    )
  }
}

Select.defaultProps = {
  options: [],
  required: false,
  label: null,
  glpi: null,
  request: null,
  value: null,
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.array,
  function: PropTypes.func.isRequired,
  glpi: PropTypes.object,
  request: PropTypes.object,
  required: PropTypes.bool,
}

export default Select
