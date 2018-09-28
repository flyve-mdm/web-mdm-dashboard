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
import ContentPane from 'components/ContentPane'
import withGLPI from 'hoc/withGLPI'
import QueryBuilder from './components/QueryBuilder'
import ItemTypeSelector from './components/ItemTypeSelector'
import ResultsDisplay from './components/ResultsDisplay'
import SeachArea from './components/SeachArea'
import getListSearchOptions from './actions/getListSearchOptions'

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
      searchResult: null,
      query: null,
      itemtype: 'Computer',
      listSearchOptions: null,
      isLoading: true,
    }
  }

  /**
   * Make the call to fetch search options list of itemtype
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleGetListSearchOptions()
  }

  /**
   * Fetch search options list of itemType
   * @function handleGetListSearchOptions
   * @async
   */
  handleGetListSearchOptions = async () => {
    try {
      await this.setState({
        isLoading: true,
        query: null,
        searchResult: null,
        listSearchOptions: null,
      })

      const { itemtype } = this.state

      this.setState({
        listSearchOptions: await getListSearchOptions(itemtype, this.props.glpi),
        isLoading: false,
      })
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }


  /**
   * Handle change itemtype
   * @function changeItemType
   * @param {object} e
   */
  changeItemType = (e) => {
    this.setState({
      itemtype: e.target.value,
    })
  }

  /**
   * Update the query state each time that the QueryBuilde query change
   * @function changeQuery
   * @param {string} query
   */
  changeQuery = (query) => {
    this.setState({
      query,
    })
  }

  /**
   * Search items in glpi
   * @function handleSearchItem
   */
  handleSearchItem = async () => {
    try {
      const { query } = this.state
      const searchResult = await this.props.glpi.searchItems(query)

      this.setState({
        searchResult: searchResult.data,
      })
    } catch (error) {
      this.setState({
        searchResult: [],
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      itemtype,
      isLoading,
      query,
      searchResult,
      listSearchOptions,
    } = this.state

    console.log(searchResult)

    return (
      <ContentPane className="search-engine">
        <h1>
          {I18n.t('search_engine.title')}
        </h1>

        <ItemTypeSelector
          itemtype={itemtype}
          changeItemType={this.changeItemType}
          handleSearchItem={this.handleSearchItem}
        />

        {
          listSearchOptions && itemtype
          && (
            <QueryBuilder
              changeQuery={this.changeQuery}
              itemtype={itemtype}
              listSearchOptions={listSearchOptions}
            />
          )
        }

        <SeachArea
          isLoading={isLoading}
          query={query}
          handleSearchItem={this.handleSearchItem}
        />

        <ResultsDisplay
          results={searchResult}
          listSearchOptions={listSearchOptions}
        />

      </ContentPane>
    )
  }
}

SearchEngine.propTypes = {
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(SearchEngine)
