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

import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'

/**
 * Component to show a message when the screen is void
 * @function EmptyMessage
 * @param {object} props
 * @return {component} Message to show
 */
const EmptyMessage = props => (
  <div className="center-block-content">
    {
        props.icon && props.showIcon
          ? <Icon iconName={props.icon} className="icon-empty-message" />
          : null
      }
    <h1 className="empty-message">
      { props.message }
    </h1>
  </div>
)

EmptyMessage.propTypes = {
  icon: PropTypes.string,
  showIcon: PropTypes.bool,
  message: PropTypes.string,
}

EmptyMessage.defaultProps = {
  icon: null,
  showIcon: false,
  message: I18n.t('commons.no_selection'),
}

export default EmptyMessage
