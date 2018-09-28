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
import I18n from 'shared/i18n'
import Panel from './Panel'

/**
 * Component to select a item type
 * @class SearchEngine
 * @extends PureComponent
 */
class ResultsDisplay extends PureComponent {
  render() {
    let display = null

    console.log(this.props.results)

    if (this.props.results) {
      if (this.props.results.length > 0) {
        const resultsWithFields = []

        this.props.results.forEach((result) => {
          const arrayResult = []
          const arrayOfArraysIdAndData = Object.entries(result)

          arrayOfArraysIdAndData.forEach((field) => {
            const objectField = {
              fieldName: this.props.listSearchOptions[field[0]].name,
              fieldValue: field[1],
              fieldId: field[0],
            }
            arrayResult.push(objectField)
          })
          resultsWithFields.push(arrayResult)
        })

        display = <Panel itemResults={resultsWithFields} />
      } else {
        display = (
          <p>
            { I18n.t('search_engine.item_not_found') }
          </p>
        )
      }
    }

    return display
  }
}

ResultsDisplay.defaultProps = {
  listSearchOptions: {},
  results: null,
  query: null,
}

ResultsDisplay.propTypes = {
  results: PropTypes.array,
  listSearchOptions: PropTypes.object,
  query: PropTypes.object,
}

export default ResultsDisplay
