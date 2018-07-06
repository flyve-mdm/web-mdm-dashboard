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
import ContentLoader, {
  BulletList,
} from 'react-content-loader'
import PropTypes from 'prop-types'

/**
 * Render of loaders
 * @function listRender
 * @param {object} props
 * @param {number} index
 * @return {component}
 */
const listRender = ({
  props,
  index,
}) => {
  if (props.type === 'list') {
    return (
      <ContentLoader key={`loader-${index.toString()}`} speed={1.5} style={{ width: '320px' }}>
        <circle cx="40" cy="45" r="27" />
        <rect x={80} y={20} rx={3} ry={3} width={250} height={10} radius={5} />
        <rect x={80} y={40} rx={3} ry={3} width={300} height={10} radius={5} />
        <rect x={80} y={60} rx={3} ry={3} width={260} height={10} radius={5} />
      </ContentLoader>
    )
  }
  return (
    <BulletList
      key={`loader-${index}`}
      speed={1.5}
      style={{ width: '320px' }}
    />
  )
}

listRender.propTypes = {
  props: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default listRender
