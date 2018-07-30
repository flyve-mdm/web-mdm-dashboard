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
import {
  NavLink,
} from 'react-router-dom'
import { Icon } from 'office-ui-fabric-react'

/**
 * Component with the icons of the side menu
 * @class IconWithPopper
 * @extends PureComponent
 */
class IconWithPopper extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    if (this.props.to) {
      return (
        <div>
          <NavLink to={this.props.to} activeClassName="selected">
            <span title={this.props.title}>
              <Icon iconName={this.props.iconName} />
            </span>
          </NavLink>
        </div>
      )
    }
    return (
      <div
        onClick={this.props.click}
        role="link"
        tabIndex="0"
      >
        <a>
          <span title={this.props.title}>
            <Icon iconName={this.props.iconName} />
          </span>
        </a>
      </div>
    )
  }
}

IconWithPopper.defaultProps = {
  to: null,
  click: () => {},
}

IconWithPopper.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  click: PropTypes.func,
}

export default IconWithPopper
