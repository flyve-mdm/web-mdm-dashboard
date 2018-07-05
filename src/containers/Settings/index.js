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
import LayoutListWithNavLinks from '../../components/LayoutListWithNavLinks'
import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes'

/**
 * Component with the settings section
 * @class Settings
 * @extends PureComponent
 */
class Settings extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    const {
      match,
      history,
    } = this.props

    return (
      <LayoutListWithNavLinks
        routes={routes}
        rootPath={match.url}
        history={history}
      >
        <GenerateRoutes
          routes={routes}
          rootPath={match.url}
        />
      </LayoutListWithNavLinks>
    )
  }
}

Settings.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Settings
