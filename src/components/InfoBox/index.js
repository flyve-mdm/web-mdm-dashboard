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
import {
  Link,
} from 'react-router-dom'

/**
 * Information boxes used on the home
 * @function InfoBox
 * @param {string} to
 * @param {string} icon
 * @param {number} count
 * @param {string} name
 * @return {component} Infobox with the data
 */
const InfoBox = ({
  to,
  icon,
  count,
  name,
}) => (
  <Link to={to}>
    <div className="info-box">
      <Icon iconName={icon} className="icon-box" />

      <span className="content-box">
        {count}
      </span>
      <span className="title-box">
        { name.toUpperCase() }
      </span>
    </div>
  </Link>
)

InfoBox.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
}

export default InfoBox
