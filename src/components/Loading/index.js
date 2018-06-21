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

/**
 * Component of loading
 * @function Loading
 * @param {object} props
 * @return {component} loading component
 */
const Loading = props => {
  /**
   * Create loader
   * @constant loader
   * @type {component}
   */
  const loader = (
    <div className='loader'>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
    </div>
  )

  /**
   * Create a small or normal load component, according to what was requested
   * @constant loadComponent
   * @type {component}
   */
  const loadComponent = props.small ?
    (
      <div className="loading loading--small" style={props.style}>
        <div>
          { loader }
        </div>
      </div>
    )
    : (
      <div className="loading" style={{marginTop: - props.headerSize, ...props.style}}>
        <div>
          { loader }
          <p>{props.message}</p>
        </div>
      </div>
    )

  return loadComponent
}

Loading.defaultProps = {
  style: {},
  small: false,
  headerSize: 0,
  message: ''
}

Loading.propTypes = {
  message: PropTypes.string,
  headerSize: PropTypes.number,
  small: PropTypes.bool,
  style: PropTypes.object
}

export default Loading
