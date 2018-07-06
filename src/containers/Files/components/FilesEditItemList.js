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
import I18n from '../../../shared/i18n'

/**
 * @class FilesEditItemList
 * @extends PureComponent
 */
export default class FilesEditItemList extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      input: '',
    }
  }

  componentDidMount() {
    const { selectedItem } = this.props

    this.setState({
      input: selectedItem['PluginFlyvemdmFile.name'],
    })
  }

  /**
   * handle change input value
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
    const {
      updateItemList,
      selectedItem,
    } = this.props

    if (e.target.value.trim() !== '') {
      updateItemList(selectedItem['PluginFlyvemdmFile.id'], e.target.value)
    }
  }

  render() {
    const { input } = this.state
    return (
      <div className="files-list">
        <div className="files-list__content">
          <div className="files-list__item">
            <div className="files-list__item-content-primary">
              <input
                type="text"
                style={{ width: '240px' }}
                className="win-textbox"
                placeholder={I18n.t('files.input_name')}
                name="input"
                value={input}
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
/** FilesEditItemList propTypes */
FilesEditItemList.propTypes = {
  selectedItem: PropTypes.object.isRequired,
  updateItemList: PropTypes.func.isRequired,
}
