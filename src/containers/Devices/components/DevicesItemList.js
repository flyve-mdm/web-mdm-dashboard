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
import IconItemList from '../../../components/IconItemList'

/**
 * @class DevicesItemList
 * @extends PureComponent
 */
export default class DevicesItemList extends PureComponent {
  render() {
    const imageAgent = this.props.itemList['PluginFlyvemdmAgent.mdm_type']
      ? `${this.props.itemList['PluginFlyvemdmAgent.mdm_type']}.png`
      : null
    let iconComponent

    if (imageAgent) {
      iconComponent = (
        <IconItemList
          image={imageAgent}
          size={this.props.size}
          backgroundColor="transparent"
        />
      )
    } else {
      iconComponent = (
        <IconItemList size={this.props.size} />
      )
    }

    return (
      <div>
        {iconComponent}
        <div style={{ display: 'inline-block' }}>
          <div className="list-pane__name">
            {this.props.itemList['PluginFlyvemdmAgent.name']}
          </div>
          <div className="list-pane__detail">
            {this.props.itemList['PluginFlyvemdmAgent.PluginFlyvemdmFleet.name']}
          </div>
          <div className="list-pane__detail">
            {this.props.itemList['PluginFlyvemdmAgent.mdm_type'].toUpperCase()}
          </div>
        </div>
      </div>
    )
  }
}
/** DevicesItemList propTypes */
DevicesItemList.propTypes = {
  itemList: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
}
