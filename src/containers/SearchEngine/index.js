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
import withGLPI from 'hoc/withGLPI'
import ContentPane from 'components/ContentPane'
import SearchQueryBuilder from './components/SearchQueryBuilder'
import Panel from './components/Panel'
import {
  setFields,
  getTranslation,
  normalizeQuery,
} from './actions'

/**
 * Component with the SearchEngine section
 * @class SearchEngine
 * @extends PureComponent
 */
class SearchEngine extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      query: null,
      itemType: 'computer',
      itemResults: undefined,
      fields: [],
      isLoading: true,
    }

    this.translations = getTranslation() // Friendly translations of each QueryBuilder input
    this.setFields = () => setFields(this)
    this.normalizeQuery = () => normalizeQuery(this)
  }

  /**
   * Make the call to fetch search options list of itemType
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRequestItemType()
  }

  /**
   * Handle change itemType
   * @function handleChangeItemType
   * @param {object} e
   */
  handleChangeItemType = (e) => {
    this.setState({
      itemType: e.target.value,
    })
  }

  /**
   * Fetch search options list of itemType
   * @function handleRequestItemType
   * @async
   */
  handleRequestItemType = async () => {
    this.setState({
      query: null,
      itemResults: undefined,
      fields: [],
      isLoading: true,
    })
    try {
      const { itemType } = this.state
      const { glpi } = this.props

      const listSearchOptions = await glpi.listSearchOptions({
        itemtype: itemType,
      })

      this.setState({
        isLoading: false,
        listSearchOptions,
      }, () => {
        this.setFields()
      })
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  /**
   * Update the query state each time that the QueryBuilde query change
   * @function handleChangeQuery
   * @param {string} query
   */
  handleChangeQuery = (query) => {
    this.setState({
      query,
    })
  }

  /**
   * Handle click event in the search button
   * @function handleOnSearch
   * @async
   */
  handleOnSearch = async () => {
    try {
      const { glpi } = this.props
      const { itemType } = this.state

      const search = await glpi.searchItems({
        itemtype: itemType,
        criteria: this.normalizeQuery(),
      })
      this.setState({
        itemResults: search.data ? search.data : [],
      })
    } catch (error) {
      this.setState({
        itemResults: [],
      })
    }
  }

  /**
   * Create Array of objects with the result of the search
   * @function arrayResultsWithFields
   * @return {array}
   */
  arrayResultsWithFields = () => {
    const {
      itemResults,
      listSearchOptions,
    } = this.state

    const resultsWithFields = []

    itemResults && itemResults.forEach((result) => {
      const arrayResult = []
      const arrayOfArraysIdAndData = Object.entries(result)

      arrayOfArraysIdAndData.forEach((field) => {
        const objectField = {
          fieldName: listSearchOptions[field[0]].name,
          fieldValue: field[1],
          fieldId: field[0],
        }
        arrayResult.push(objectField)
      })
      resultsWithFields.push(arrayResult)
    })

    return resultsWithFields
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      itemType,
      fields,
      isLoading,
      query,
      itemResults,
    } = this.state
    return (
      <ContentPane>
        <div style={{ margin: '0 10px' }}>
          <h1>
            {I18n.t('search_engine.title')}
          </h1>
          <input
            type="text"
            style={{ marginRight: 10 }}
            className="win-textbox"
            placeholder="Itemtype"
            name="itemTypeName"
            value={itemType}
            onChange={this.handleChangeItemType}
          />
          <button
            className="btn btn--secondary"
            onClick={this.handleRequestItemType}
            type="button"
          >
            {I18n.t('commons.change')}
          </button>
        </div>
        {
          fields.length > 0
          && (
            <SearchQueryBuilder
              fields={fields}
              handleChangeQuery={this.handleChangeQuery}
              translations={this.translations}
            />
          )
        }
        <br />
        <div style={{ margin: '0 10px' }}>
          {
            isLoading
              ? (
                <p>
                  {I18n.t('commons.loading')}
                  ...
                </p>
              )
              : query
                ? query.rules.length
                  ? (
                    <button
                      className="btn btn--primary"
                      onClick={this.handleOnSearch}
                      type="submit"
                    >
                      {I18n.t('commons.search')}
                    </button>
                  )
                  : null
                : (
                  <p>
                    {I18n.t('search_engine.itemType_not_found')}
                  </p>
                )
          }
          {
            itemResults
              ? itemResults.length > 0
                ? (
                  <Panel
                    itemResults={itemResults.length > 0 ? this.arrayResultsWithFields() : []}
                  />
                )
                : (
                  <p>
                    {I18n.t('search_engine.item_not_found')}
                  </p>
                )
              : null
          }
        </div>
      </ContentPane>
    )
  }
}

SearchEngine.propTypes = {
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(SearchEngine)
