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
 * @class DependentInventory
 * @extends PureComponent
 */
export default class DependentInventory extends PureComponent {
  /**
   * handle build inventory list
   * @function buildList
   * @param {object} value
   */
  buildList = value => Object.keys(value).map(index => (
    <div
      className="list-content"
      key={`buildList-${index.toString()}`}
    >
      <div className="list-col">
        {I18n.t(`commons.${index.toString()}`)}
      </div>
      <div className="list-col">
        {value[index]}
      </div>
    </div>
  ))

  render() {
    if (this.props.data) {
      return (
        <div>
          <div className="title">
            {this.props.title}
          </div>
          {
            Object.keys(this.props.fields).map(key => ({
              [this.props.fields[key]]: this.props.data[key],
            })).map(value => (this.buildList(value)))
          }
        </div>
      )
    }
    return (null)
  }
}

/** Inventory defaultProps */
DependentInventory.defaultProps = {
  data: null,
}

/** Inventory propTypes */
DependentInventory.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  data: PropTypes.object,
}
