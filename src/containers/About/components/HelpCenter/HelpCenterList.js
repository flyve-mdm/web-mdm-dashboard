import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import  { I18n } from "react-i18nify"

import Articles from '../../../../data/helpCenter.json'

class HelpCenterList extends Component {
    constructor(props) {
        super(props)

        let popular = []

        for (let index = 0; index < Articles.data.length; index++) {

            const element = Articles.data[index]
            
            if (element['HelpCenter.rating'] > 70 && popular.length <= 5) {
                popular.push(element)
            }
            
        }

        this.state = {
            list: new WinJS.Binding.List(popular),
            layout: { type: WinJS.UI.ListLayout },
            labelList: I18n.t('about.help_center_STRINGS.popular'),
            suggestionList: Articles.data.map((article) => article['HelpCenter.name']),
            itemSelected: null
        }
    }

    redirectToArticle = id => (
        this.props.history.push(`/app/about/help/article/${id}`)
    )

    redirectToFeedBack = () => {
        this.props.history.push('/app/about/help/feedback')
    }

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div 
            style={{ padding: '14px', width: '100%' }}
            onClick={() => this.redirectToArticle(item.data['HelpCenter.id'])}>
                <span className="documentIcon" style={{marginRight: '5px'}}/>
                {item.data['HelpCenter.name']}
            </div>
        )
    })

    changeSelectItem = (item) => {
        this.setState({ itemSelected: item })
    }

    showAllArticles = () => {
        this.setState({labelList: I18n.t('about.help_center_STRINGS.all_articles'), list: new WinJS.Binding.List(Articles.data)})
    }

    filterArticles = (filter) => {
        const filteredArticles = []
        for (let index = 0; index < Articles.data.length; index++) {
            const element = Articles.data[index]
            if (element['HelpCenter.name'].toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                filteredArticles.push(element)
            }
        }
        this.setState({
            list: new WinJS.Binding.List(filteredArticles)
        })
    }

    handleSelectionChanged = (eventObject) => {
        const listView = eventObject.currentTarget.winControl
        const id = listView.selection.getItems()._value[0].data['HelpCenter.id']
        setTimeout(() => {
            this.setState({ itemSelected: id })
        }, 0)
    }

    handleSuggestionsRequested = (eventObject) => {
        let queryText = eventObject.detail.queryText,
            query = queryText.toLowerCase(),
            suggestionCollection = eventObject.detail.searchSuggestionCollection

        if (queryText.length > 0) {
            for (let i = 0, len = this.state.suggestionList.length; i < len; i++) {
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
            <div className="listPane" style={{ padding: 0 }}>
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3>{this.state.labelList}</h3>
                        </div>
                        <div>
                            <div>
                                <ReactWinJS.AutoSuggestBox
                                style={{
                                    marginTop: '20px',
                                    marginRight: '50px',
                                    width: '150px',
                                    minWidth: 'unset'
                                }}
                                placeholderText={I18n.t('about.help_center_STRINGS.search_an_article')}
                                onSuggestionsRequested={this.handleSuggestionsRequested}
                                onQuerySubmitted={this.handleQuerySubmitted} />       
                            </div>
                            <div onClick={this.handleSearch} style={{
                                position: 'absolute',
                                top: '124px',
                                right: '20%',
                                fontSize: '20px'
                            }}>
                                <span className="searchIcon"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactWinJS.ListView
                ref="listView"
                className="contentListView win-selectionstylefilled"
                style={{ height: 'calc(100% - 48px)' }}
                itemDataSource={this.state.list.dataSource}
                itemTemplate={this.itemRenderer}
                layout={this.state.layout}
                selectionMode="single"
                tapBehavior="directSelect"
                onSelectionChanged={this.handleSelectionChanged}
                />

                {
                    this.state.labelList !== I18n.t('about.help_center_STRINGS.popular') ? '' : 
                        <div>
                            <div className="separator" />
                            
                            <div>
                                <a onClick={this.showAllArticles}>
                                    { I18n.t('about.help_center_STRINGS.browse_all_articles') }            
                                </a>
                            </div>
                        </div>
                }

                <div className="separator" />

                <div className="itemList" onClick={this.redirectToFeedBack}>
                    <span className="messageIcon" style={{marginRight: '5px'}}/>
                    { I18n.t('about.help_center_STRINGS.send_feedback') }
                </div>
            </div>
        )
    }
}


HelpCenterList.propTypes = {
    history: PropTypes.object.isRequired
}

export default HelpCenterList