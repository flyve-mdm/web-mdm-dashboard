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
  PureComponent
} from 'react'
import withGLPI from '../../hoc/withGLPI'
import withHandleMessages from '../../hoc/withHandleMessages'
import {
  uiSetNotification
} from '../../store/ui/actions'
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import SearchQueryBuilder from './components/SearchQueryBuilder'
import Panel from './components/Panel'
import ContentPane from '../../components/ContentPane'
import {
  setFields,
  getTranslation,
  normalizeQuery
} from './actions'
import {
  I18n
} from 'react-i18nify'

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch)
  }
  return {
    actions
  }
}

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
      isLoading: true
    }

    this.translations = getTranslation() // Friendly translations of each QueryBuilder input
    this.setFields = () => setFields(this)
    this.normalizeQuery = () => normalizeQuery(this)
  }

  /**
   * Handle change itemType
   * @function handleChangeItemType
   * @param {object} e
   */
  handleChangeItemType = (e) => {
    this.setState({
      itemType: e.target.value
    })
  }

  /**
   * Make the call to fetch search options list of itemType
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRequestItemType()
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
      isLoading: true
    })
    try {
      const listSearchOptions = await this.props.glpi.listSearchOptions({
        itemtype: this.state.itemType
      })

      this.setState({
        isLoading: false,
        listSearchOptions: listSearchOptions
      }, () => {
        this.setFields()
      })

    } catch (error) {
      this.setState({
        isLoading: false
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
      query: query
    })
  }

  /**
   * Handle click event in the search button
   * @function handleOnSearch
   * @async
   */
  handleOnSearch = async () => {
    try {
      const search = await this.props.glpi.searchItems({
        itemtype: this.state.itemType,
        criteria: this.normalizeQuery()
      })
      this.setState({
        itemResults: search.data ? search.data : []
      })

    } catch (error) {
      this.setState({
        itemResults: []
      })
    }
  }

  /**
   * Create Array of objects with the result of the search
   * @function arrayResultsWithFields
   * @return {array}
   */
  arrayResultsWithFields = () => {
    const resultsWithFields = []

    this.state.itemResults && this.state.itemResults.forEach((result, index) => {
      let arrayResult = []
      let arrayOfArraysIdAndData = Object.entries(result)

      arrayOfArraysIdAndData.forEach((field, indexField) => {
        const objectField = {
          fieldName: this.state.listSearchOptions[field[0]]['name'],
          fieldValue: field[1],
          fieldId: field[0]
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
    return (
      <ContentPane>
        <div style={{ margin: '0 10px' }}>
          <h1>
            {I18n.t('search_engine.title')}
          </h1>
          <input
            type="text"
            style={{marginRight:10}}
            className="win-textbox"
            placeholder="Itemtype"
            name="itemTypeName"
            value={this.state.itemType}
            onChange={this.handleChangeItemType}
          />
          <button className="btn btn--secondary" onClick={this.handleRequestItemType}>
            {I18n.t('commons.change')}
          </button>
        </div>
        {
          this.state.fields.length > 0 &&
            <SearchQueryBuilder
              fields={this.state.fields}
              handleChangeQuery={this.handleChangeQuery}
              translations={this.translations}
            />
        }
        <br />
        <div style={{ margin: '0 10px' }}>
          {
            this.state.isLoading ?
              <p>
                {I18n.t('commons.loading')}...
              </p>
              : this.state.query ?
                this.state.query.rules.length ?
                  (
                    <button className="btn btn--primary" onClick={this.handleOnSearch}>
                      {I18n.t('commons.search')}
                    </button>
                  )
                  : null
                : <p>{I18n.t('search_engine.itemType_not_found')}</p>
          }
          {
            this.state.itemResults ?
              this.state.itemResults.length > 0 ?
                  <Panel
                      itemType={this.state.itemType}
                      itemResults={this.state.itemResults.length > 0 ? this.arrayResultsWithFields() : []}
                      itemFields={this.state.fields}
                  />
                  : <p>{I18n.t('search_engine.item_not_found')}</p>
              : null
          }
        </div>
      </ContentPane>
    )
  }
}

SearchEngine.propTypes = {
    glpi: PropTypes.object.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(withGLPI(withHandleMessages(SearchEngine)))
