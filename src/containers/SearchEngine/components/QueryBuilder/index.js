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
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import itemtype from 'shared/itemtype'
import I18n from 'shared/i18n'
import createFieldList from '../../actions/createFieldList'
import Criteria from './Criteria'
import MetaCriteria from './MetaCriteria'

/**
 * Component to select a item type
 * @class SearchEngine
 * @extends PureComponent
 */
class QueryBuilder extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      criteria: [],
      metaCriteria: [],
      fieldList: createFieldList(props.listSearchOptions),
    }
  }

  /**
   * Add a criteria by default
   * @function componentDidMount
   */
  componentDidMount() {
    this.addCriteria()
  }

  /**
   * Change the query values
   * @function componentDidUpdate
   */
  componentDidUpdate() {
    this.props.changeQuery({
      itemtype: this.props.itemtype,
      criteria: this.state.criteria,
      metacriteria: this.state.metaCriteria,
    })
  }

  /**
   * Add a new criteria
   * @function addCriteria
   */
  addCriteria = () => {
    const { criteria: currentCriteria, fieldList } = this.state

    this.setState({
      criteria: [
        ...currentCriteria,
        {
          link: 'AND',
          field: fieldList[0].value,
          searchtype: 'contains',
          value: '',
        },
      ],
    })
  }

  /**
   * Add a new metacriteria
   * @function addMetaCriteria
   */
  addMetaCriteria = () => {
    const { metaCriteria: currentCriteria } = this.state

    this.setState({
      metaCriteria: [
        ...currentCriteria,
        {
          link: 'AND',
          itemtype: Object.keys(itemtype)[0],
          field: null,
          searchtype: 'contains',
          value: '',
        },
      ],
    })
  }

  /**
   * Manage the change of values of the rules
   * @function changeRule
   * @param {string} type
   * @param {string} id
   * @param {object} newValue
   */
  changeRule = (type, id, newValue) => {
    const CurrentRules = this.state[type]
    const newRules = [...CurrentRules]

    if (newValue) {
      newRules[id] = { ...newRules[id], ...newValue }

      this.setState({
        [type]: newRules,
      })
    } else {
      this.setState({
        [type]: newRules.slice(0, id).concat(newRules.slice(id + 1)),
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <div className="froms">
        <div className="search-engine__add-buttons">
          <button
            className="btn btn--primary"
            type="button"
            onClick={this.addCriteria}
          >
            +
            {' '}
            {I18n.t('search_engine.rule')}
          </button>
          <button
            className="btn btn--secondary"
            type="button"
            onClick={this.addMetaCriteria}
          >
            +
            {' '}
            {I18n.t('search_engine.intersection')}
          </button>
        </div>

        <Criteria
          rules={this.state.criteria}
          changeRule={this.changeRule}
          fieldList={this.state.fieldList}
        />

        <MetaCriteria
          rules={this.state.metaCriteria}
          changeRule={this.changeRule}
        />
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  changeQuery: PropTypes.func.isRequired,
  itemtype: PropTypes.string.isRequired,
  listSearchOptions: PropTypes.object.isRequired,
}

export default QueryBuilder
