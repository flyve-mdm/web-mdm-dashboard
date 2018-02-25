import React, { Component } from "react"
import Articles from '../../data/helpCenter.json'
import WinJS from 'winjs'
import Feedback from './Feedback'
import HelpCenterList from './HelpCenterList'
import HelpCenterArticle from './HelpCenterArticle'
import PropTypes from 'prop-types'
import I18n from "react-i18nify/build/lib/I18n";

class HelpCenter extends Component {

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

    changeSelectItem = (item) => {
        this.setState({ itemSelected: item })
    }

    showAllArticles = () => {
        this.setState({labelList: I18n.t('about.help_center_STRINGS.all_articles'), list: new WinJS.Binding.List(Articles.data)})
    }

    filterArticles = (filter) => {
        let filteredArticles = []
        for (let index = 0; index < Articles.data.length; index++) {
            const element = Articles.data[index]
            console.log(element['HelpCenter.name'].toLowerCase().indexOf(filter.toLowerCase()) >= 0)
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

    render() {

        if (this.state.itemSelected !== null && this.state.itemSelected !== 'feedback') {
            return (
                <HelpCenterArticle
                itemListPaneWidth={this.props.itemListPaneWidth} 
                articles={Articles}
                itemSelected={this.state.itemSelected}
                changeSelectItem={this.changeSelectItem}/>
            )
        } else if (this.state.itemSelected === 'feedback') {

            return (
                <Feedback 
                itemListPaneWidth={this.props.itemListPaneWidth}
                changeSelectItem={this.changeSelectItem} 
                sendFeedback={this.props.sendFeedback}
                isLoading={this.props.isLoading}
                isError={this.props.isError}/>
            )

        } else {
            return (
                <HelpCenterList
                    itemListPaneWidth={this.props.itemListPaneWidth}
                    labelList={this.state.labelList}
                    suggestionList={this.state.suggestionList}
                    dataSource={this.state.list.dataSource}
                    layout={this.state.layout}
                    handleSelectionChanged={this.handleSelectionChanged}
                    showAllArticles={this.showAllArticles}
                    changeSelectItem={this.changeSelectItem}
                    filterArticles={this.filterArticles}
                    />
          )
        }

    }
}
HelpCenter.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    sendFeedback: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired   
}

export default HelpCenter