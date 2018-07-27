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
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import IconItemList from 'components/IconItemList'

/**
 * @class ApplicationsItemList
 * @extends PureComponent
 */
export default class ApplicationsItemList extends PureComponent {
  render() {
    const {
      itemList,
      size,
    } = this.props

    let image
    if (itemList['PluginFlyvemdmPackage.icon']) {
      image = (
        <IconItemList
          size={size}
          image={`data:image/png;base64, ${itemList['PluginFlyvemdmPackage.icon']}`}
          type="base64"
          backgroundColor="transparent"
        />
      )
    } else {
      image = (
        <div
          style={{
            display: 'inline-block',
            width: size,
            height: size,
            fontSize: '25px',
            textAlign: 'center',
            verticalAlign: 'super',
          }}
        >
          <Icon iconName="Page" />
        </div>
      )
    }
    return (
      <div>
        {image}
        <div style={{ marginLeft: 5, display: 'inline-block' }}>
          <div className="list-pane__name">
            {itemList['PluginFlyvemdmPackage.alias']}
          </div>
          <div className="list-pane__detail">
            {itemList['PluginFlyvemdmPackage.name']}
          </div>
        </div>
      </div>
    )
  }
}

ApplicationsItemList.defaultProps = {
  itemList: null,
  size: 0,
}

/** ApplicationsItemList propTypes */
ApplicationsItemList.propTypes = {
  itemList: PropTypes.object,
  size: PropTypes.number,
}
