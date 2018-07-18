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
import Select from '../Select'
import DatePicker from '../DatePicker'
import TextArea from '../TextArea'
import Input from '../Input'

/**
 * Component to select the type of the form entry
 * @function createListElement
 * @param {string} icon
 * @param {array} elements
 * @param {number} index
 * @return {component} Form entry
 */
const createListElement = ({
  icon,
  elements,
  index,
}) => {
  const style = icon ? {
    marginLeft: 30,
    overflow: 'hidden',
  } : {
    overflow: 'hidden',
  }
  return (
    <div className="froms__row" style={style} key={`fromsRow-${index.toString()}`}>
      {
        elements.map((element) => {
          let renderElement
          if (element.type === 'select') {
            renderElement = (
              <Select
                label={element.label}
                name={element.name}
                value={element.value}
                options={element.options}
                function={element.function}
                glpi={element.glpi}
                request={element.request}
                key={element.name}
              />
            )
          } else if (element.type === 'date') {
            renderElement = (
              <DatePicker
                label={element.label}
                name={element.name}
                value={element.value}
                function={element.function}
                key={element.name}
              />
            )
          } else if (element.type === 'textArea') {
            renderElement = (
              <TextArea
                label={element.label}
                type={element.type}
                name={element.name}
                value={element.value}
                placeholder={element.placeholder}
                function={element.function}
                disabled={element.disabled}
                style={element.style}
                delete={element.delete}
                key={element.name}
              />
            )
          } else {
            renderElement = (
              <Input
                label={element.label}
                type={element.type}
                name={element.name}
                value={element.value}
                placeholder={element.placeholder}
                function={element.function}
                disabled={element.disabled}
                style={element.style}
                delete={element.delete}
                parametersToEvaluate={element.parametersToEvaluate}
                forceValidation={element.forceValidation}
                key={element.name}
              />
            )
          }
          return renderElement
        })
      }
    </div>
  )
}

createListElement.propTypes = {
  icon: PropTypes.string,
  elements: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
}

createListElement.defaultProps = {
  icon: null,
}

export default createListElement
