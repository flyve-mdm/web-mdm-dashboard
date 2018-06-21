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
  PureComponent
} from 'react'
import {
  NavLink
} from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Component with the images of the side menu
 * @class ImgWithPopper
 * @extends PureComponent
 */
class ImgWithPopper extends PureComponent {
  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div>
        <NavLink to={this.props.to} activeClassName="selected">
          <img
            alt={this.props.alt}
            src={this.props.img}
            style={{
              width: '20px',
              maxWidth: '100%',
              height: 'auto'
            }}
            title={this.props.title}
          />
        </NavLink>
      </div>
    )
  }
}

ImgWithPopper.defaultProps = {
  alt: ""
}

ImgWithPopper.propTypes = {
  to: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string
}

export default ImgWithPopper
