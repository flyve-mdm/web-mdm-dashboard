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
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import Loading from 'components/Loading'
import ContentPane from 'components/ContentPane'
import withGLPI from 'hoc/withGLPI'

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
      <span className="iconFont documentIcon" style={{ marginRight: '5px' }} />
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
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
        displayErrorPage: false,
      }))
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
    this.setState(prevState => ({
      labelList: I18n.t('about.help_center.all_articles'),
      list: new WinJS.Binding.List(prevState.articles),
    }))
  }

  filterArticles = (filter) => {
    const filteredArticles = []
    this.state.articles.forEach((element) => {
      if (element.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
        filteredArticles.push(element)
      }
    })
    this.setState({
      list: new WinJS.Binding.List(filteredArticles),
    })
  }

  handleSuggestionsRequested = (eventObject) => {
    const { queryText } = eventObject.detail
    const query = queryText.toLowerCase()
    const suggestionCollection = eventObject.detail.searchSuggestionCollection

    if (queryText.length > 0) {
      for (let i = 0, len = this.state.suggestionList.length; i < len; i += 1) {
        if (this.state.suggestionList[i].toLowerCase().indexOf(query) !== -1) {
          suggestionCollection.appendQuerySuggestion(this.state.suggestionList[i])
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
    return (
      this.state.isLoading
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
                      {this.state.labelList}
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
                      <span className="iconFont searchIcon" />
                    </div>
                  </div>
                </div>
              </div>
              <ReactWinJS.ListView
                className="list-pane__content win-selectionstylefilled"
                style={{ height: 'calc(100% - 48px)' }}
                itemDataSource={this.state.list.dataSource}
                itemTemplate={this.itemRenderer}
                layout={this.state.layout}
                selectionMode="single"
                tapBehavior="directSelect"
              />

              {
              this.state.labelList !== I18n.t('about.help_center.recent_articles')
                ? ''
                : (
                  <div>
                    <div className="separator" />

                    <div>
                      <button
                        className="btn btn-link"
                        onClick={this.showAllArticles}
                        type="button"
                      >
                        { I18n.t('about.help_center.browse_all_articles') }
                      </button>
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
                <span className="iconFont messageIcon" style={{ marginRight: '5px' }} />
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
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(HelpCenterList)
