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
import I18n from 'shared/i18n'

/**
 * Component to select a item type
 * @class SearchEngine
 * @extends PureComponent
 */
class ItemTypeSelector extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="search-engine__selector">
        <input
          type="text"
          style={{ marginRight: 10 }}
          className="win-textbox"
          placeholder="Itemtype"
          name="itemtypeName"
          value={this.props.itemtype}
          onChange={this.props.changeItemType}
        />

        <button
          className="btn btn--secondary"
          onClick={this.props.handleSearchItem}
          type="button"
        >
          {I18n.t('commons.change')}
        </button>
      </div>
    )
  }
}

ItemTypeSelector.propTypes = {
  itemtype: PropTypes.string.isRequired,
  changeItemType: PropTypes.func.isRequired,
  handleSearchItem: PropTypes.func.isRequired,
}

export default ItemTypeSelector
