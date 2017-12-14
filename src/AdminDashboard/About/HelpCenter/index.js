import React, { Component } from "react"
import Articles from '../../data/helpCenter.json'
import WinJS from 'winjs'
import Feedback from './Feedback'
import HelpCenterList from './HelpCenterList'
import HelpCenterArticle from './HelpCenterArticle'

export default class HelpCenter extends Component {

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
            labelList: 'Popular',
            itemSelected: null
        }
    }

    changeSelectItem = (item) => {
        this.setState({ itemSelected: item })
    }

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    showAllArticles = () => {
        this.setState({labelList: 'All articles', list: new WinJS.Binding.List(Articles.data)})
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
                articles={Articles}
                itemSelected={this.state.itemSelected}
                changeSelectItem={this.changeSelectItem}/>
            )
        } else if (this.state.itemSelected === 'feedback') {

            return <Feedback changeSelectItem={this.changeSelectItem} />

        } else {
            return (
                <HelpCenterList
                    labelList={this.state.labelList}
                    dataSource={this.state.list.dataSource}
                    layout={this.state.layout}
                    handleContentAnimating={this.handleContentAnimating}
                    handleSelectionChanged={this.handleSelectionChanged}
                    showAllArticles={this.showAllArticles}
                    changeSelectItem={this.changeSelectItem}
                    />
          )
        }

    }
}