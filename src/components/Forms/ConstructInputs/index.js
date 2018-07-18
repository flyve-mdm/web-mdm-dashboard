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

import createListElement from './createListElement'

/**
 * Component to create a list of form entries
 * @function ConstructInputs
 * @param {object} props
 * @return {component} List of form entries
 */
const ConstructInputs = (props) => {
  let icon

  if (props.icon) {
    icon = (
      <div className="froms__row froms__row--icon">
        <span className={props.icon} />
        {
          props.title
            ? (
              <span style={{ marginLeft: '10px' }}>
                {props.title}
              </span>
            )
            : null
        }
      </div>
    )
  }

  return (
    <React.Fragment>
      { icon }
      {
        props.data.map((elements, index) => createListElement({
          icon: props.icon,
          elements,
          index,
        }))
      }
    </React.Fragment>
  )
}

ConstructInputs.propTypes = {
  data: PropTypes.array.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
}

ConstructInputs.defaultProps = {
  icon: null,
  title: null,
}

export default ConstructInputs
