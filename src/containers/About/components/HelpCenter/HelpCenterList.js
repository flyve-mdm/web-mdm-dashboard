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
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import I18n from '../../../../shared/i18n'
import withGLPI from '../../../../hoc/withGLPI'
import Loading from '../../../../components/Loading'
import ContentPane from '../../../../components/ContentPane'
import itemtype from '../../../../shared/itemtype'
import publicURL from '../../../../shared/publicURL'

/**
 * @class HelpCenterList
 */
class HelpCenterList extends PureComponent {
  itemRenderer = ReactWinJS.reactRenderer(item => (
    <div
      style={{ padding: '14px', width: '100%' }}
      onClick={() => this.redirectToArticle(item.data.id)}
      role="link"
      tabIndex="0"
    >
      <span className="documentIcon" style={{ marginRight: '5px' }} />
      {item.data.name}
    </div>
  ))

  constructor(props) {
    super(props)
    this.state = {
      articles: undefined,
      list: {},
      suggestionList: undefined,
      layout: {
        type: WinJS.UI.ListLayout,
      },
      labelList: I18n.t('about.help_center.recent_articles'),
      isLoading: true,
    }
  }

  componentDidMount = async () => {
    try {
      const response = await this.props.glpi.getAllItems({
        itemtype: itemtype.KnowbaseItem,
      })

      const recentArticles = response.slice().sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

      recentArticles.splice(5)

      this.setState({
        articles: response,
        list: new WinJS.Binding.List(recentArticles),
        suggestionList: response.map(article => article.name),
        isLoading: false,
      })
    } catch (error) {
      this.props.handleMessage({
        type: 'alert',
        message: error,
        customErrorRoute: '/app/about/help/error',
      })
      this.setState({
        isLoading: false,
      })
    }
  }

  redirectToArticle = (article) => {
    this.props.history.push(`${publicURL}/app/about/help/${article}`)
  }

  redirectToFeedBack = () => {
    this.props.history.push(`${publicURL}/app/about/help/feedback`)
  }

  showAllArticles = () => {
    const { articles } = this.state

    this.setState({
      labelList: I18n.t('about.help_center.all_articles'),
      list: new WinJS.Binding.List(articles),
    })
  }

  filterArticles = (filter) => {
    const { articles } = this.state

    const filteredArticles = []
    articles.forEach((element) => {
      if (element.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
        filteredArticles.push(element)
      }
    })
    this.setState({
      list: new WinJS.Binding.List(filteredArticles),
    })
  }

  handleSuggestionsRequested = (eventObject) => {
    const { suggestionList } = this.state

    const { queryText } = eventObject.detail
    const query = queryText.toLowerCase()
    const suggestionCollection = eventObject.detail.searchSuggestionCollection

    if (queryText.length > 0) {
      for (let i = 0, len = suggestionList.length; i < len; i += 1) {
        if (suggestionList[i].toLowerCase().indexOf(query) !== -1) {
          suggestionCollection.appendQuerySuggestion(suggestionList[i])
        }
      }
    }
  }

  handleQuerySubmitted = (eventObject) => {
    this.filterArticles(eventObject.detail.queryText)
  }

  handleSearch = () => {
    this.filterArticles(document.getElementsByClassName('win-autosuggestbox-input win-textbox')[0].value)
  }

  render() {
    const {
      isLoading,
      list,
      labelList,
      layout,
    } = this.state

    return (
      isLoading
        ? <Loading message={`${I18n.t('commons.loading')}...`} />
        : (
          <ContentPane>
            <h2 style={{ margin: '10px' }}>
              {I18n.t('about.help_center.title')}
            </h2>
            <div className="list-pane" style={{ padding: 0 }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ margin: '10px' }}>
                      {labelList}
                    </h3>
                  </div>
                  <div>
                    <div>
                      <ReactWinJS.AutoSuggestBox
                        style={{
                          marginTop: '20px',
                          marginRight: '50px',
                          width: '150px',
                          minWidth: 'unset',
                        }}
                        placeholderText={I18n.t('about.help_center.search_an_article')}
                        onSuggestionsRequested={this.handleSuggestionsRequested}
                        onQuerySubmitted={this.handleQuerySubmitted}
                      />
                    </div>
                    <div
                      onClick={this.handleSearch}
                      style={{
                        fontSize: '20px',
                        float: 'right',
                        marginTop: '-26px',
                        marginRight: '20px',
                        cursor: 'pointer',
                      }}
                      role="button"
                      tabIndex="0"
                    >
                      <span className="searchIcon" />
                    </div>
                  </div>
                </div>
              </div>
              <ReactWinJS.ListView
                className="list-pane__content win-selectionstylefilled"
                style={{ height: 'calc(100% - 48px)' }}
                itemDataSource={list.dataSource}
                itemTemplate={this.itemRenderer}
                layout={layout}
                selectionMode="single"
                tapBehavior="directSelect"
              />

              {
              labelList !== I18n.t('about.help_center.recent_articles')
                ? ''
                : (
                  <div>
                    <div className="separator" />

                    <div>
                      <a
                        onClick={this.showAllArticles}
                        role="link"
                        tabIndex="0"
                      >
                        { I18n.t('about.help_center.browse_all_articles') }
                      </a>
                    </div>
                  </div>
                )
            }

              <div className="separator" />

              <div
                className="itemList"
                onClick={this.redirectToFeedBack}
                role="link"
                tabIndex="0"
              >
                <span className="messageIcon" style={{ marginRight: '5px' }} />
                { I18n.t('about.help_center.send_feedback') }
              </div>
            </div>
          </ContentPane>
        )
    )
  }
}

/** HelpCenterList propTypes */
HelpCenterList.propTypes = {
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(HelpCenterList)
