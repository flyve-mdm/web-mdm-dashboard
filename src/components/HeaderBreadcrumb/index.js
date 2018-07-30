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
  Link,
} from 'react-router-dom'
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import publicURL from 'shared/publicURL'

/**
 * Component with the breadcrumb menu of the header
 * @class HeaderBreadcrumb
 * @extends PureComponent
 */
class HeaderBreadcrumb extends PureComponent {
  /**
   * Create the breadcrumb menu
   * @function breadcrumbs
   * @return {array} Breadcrumb menu
   */
  breadcrumbs() {
    const breadcrumbs = []
    const addresses = this.props.location.pathname.split('/')
    for (let index = (publicURL === '') ? 2 : 3; index < addresses.length; index += 1) {
      let path = `${publicURL}/app`
      for (let i = (publicURL === '') ? 2 : 3; i < index + 1; i += 1) {
        path += `/${addresses[i]}`
      }
      breadcrumbs.push(
        <React.Fragment key={path}>
          <span className="header-breadcrumb-separator">
            /
          </span>
          <span>
            <Link to={path}>
              {Number(addresses[index].replace(/\b\w/g, l => l)) ? addresses[index].replace(/\b\w/g, l => l) : I18n.t(`commons.${addresses[index].replace(/\b\w/g, l => l.toLowerCase())}`)}
            </Link>
          </span>
        </React.Fragment>,
      )
    }

    return breadcrumbs
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <header className="header-block">

        <div className="header-icon">
          <Icon
            iconName="GlobalNavButton"
            onClick={this.props.handleToggleExpand}
          />
        </div>

        <nav className="header-breadcrumb">
          <span>
            <Link to={`${publicURL}/app`}>
              {I18n.t('commons.dashboard')}
            </Link>
          </span>

          {this.breadcrumbs()}

        </nav>

      </header>
    )
  }
}

HeaderBreadcrumb.propTypes = {
  handleToggleExpand: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

export default HeaderBreadcrumb
