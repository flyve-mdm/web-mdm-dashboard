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
 * Component to create a textArea input
 * @function TextArea
 * @param {object} props
 * @return {component}
 */
const TextArea = props => (
  <div className="froms__col">
    {
      props.label
      && (
        <p>
          {props.label}
        </p>
      )
    }
    <textarea
      rows={props.rows}
      className="win-textarea"
      name={props.name}
      value={(props.value || undefined)}
      placeholder={props.placeholder}
      onChange={event => props.function(props.name, event.target.value)}
      disabled={props.disabled}
      style={props.style}
      required={props.required}
    />
  </div>
)

TextArea.defaultProps = {
  label: '',
  required: false,
  rows: 6,
  placeholder: null,
  function: () => {},
  style: {},
  disabled: false,
  value: undefined,
}

TextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  function: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  rows: PropTypes.number,
}

export default TextArea
