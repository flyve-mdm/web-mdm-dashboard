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
 * @class ApplicationsEditItemList
 * @extends PureComponent
 */
export default class ApplicationsEditItemList extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    this.setState({
      input: this.props.selectedItem['PluginFlyvemdmPackage.alias'],
    })
  }

  /**
   * Handle change input value
   * @function changeInput
   * @param {object} e
   */
  changeInput = (e) => {
    this.setState({
      input: e.target.value,
    })
  }

  /**
   * Update item list when blur input
   * @function blurInput
   * @param {object} e
   */
  blurInput = (e) => {
    if (e.target.value.trim() !== '') {
      this.props.updateItemList(this.props.selectedItem['PluginFlyvemdmPackage.id'], e.target.value)
    }
  }

  render() {
    return (
      <div className="files-list">
        <div className="files-list__content">
          <div className="files-list__item">
            <div className="files-list__item-content-primary">
              <input
                type="text"
                style={{ width: '240px' }}
                className="win-textbox"
                placeholder={I18n.t('applications.name')}
                name="input"
                value={this.state.input}
                onChange={this.changeInput}
                onBlur={this.blurInput}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
/** ApplicationsEditItemList propTypes */
ApplicationsEditItemList.propTypes = {
  selectedItem: PropTypes.object.isRequired,
  updateItemList: PropTypes.func.isRequired,
}
