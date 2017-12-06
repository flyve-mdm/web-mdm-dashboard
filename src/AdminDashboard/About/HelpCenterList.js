import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import Articles from '../data/helpCenter.json'
import ReactMarkdown from 'react-markdown'
let WinJS = require('winjs')

export default class HelpCenterList extends Component {

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

    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                <span className="documentIcon" style={{marginRight: '5px'}}/>
                {item.data['HelpCenter.name']}
            </div>
        )
    })

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
        let listView = eventObject.currentTarget.winControl
        let id = listView.selection.getItems()._value[0].data['HelpCenter.id']
        console.log(id)
        setTimeout(function () {
            this.setState({ itemSelected: id })
        }.bind(this), 0)
    }

    renderArticle = () => {
        let Article
        Articles.data.forEach(element => {
            if (element['HelpCenter.id'] === this.state.itemSelected) {
                Article = element['HelpCenter.source']
            }
        })
        Article = require(`./${Article}`)
        return (
            <div style={{padding: '0 10px'}}>
                <ReactMarkdown source={Article}/>
            </div>
        )
    }

    render() {
        let showAll = ''
        if (this.state.labelList === 'Popular' ) {
            showAll = (
                <div>
                    <div className="separator" />
                    
                    <div style={{padding: '22px 14px 22px 10px'}}>
                        <a onClick={this.showAllArticles}>Browse all articles</a>
                    </div>
                </div>
            )
        }

        if (this.state.itemSelected !== null && this.state.itemSelected !== 'feedback') {
            return (
                <div>
                    <h2 className="win-h2 titleContentPane" onClick={() =>this.changeSelectItem(null)}>
                        {'<'} Help Center
                    </h2>

                    {this.renderArticle()}

                </div>
            )
        } else if (this.state.itemSelected === 'feedback') {
            return (
                <div>
                    <h2 className="win-h2 titleContentPane" onClick={() => this.changeSelectItem(null)}>
                        {'<'} Help Center
                    </h2>
                    <div style={{padding: '0 10px'}}>
                        <h3 className="win-h3">Feedback</h3>
                        <div className="feedback">
                            <textarea className="win-textbox feedback-textarea"/>
                            <button className="win-button" style={{float: 'right'}}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <ReactWinJS.ToolBar className="listToolBar">
                        <ReactWinJS.ToolBar.ContentCommand
                            key="content"
                            icon="accept"
                            label="search bar"
                            style={{
                                width: 'calc(100% - 110px)',
                                padding: '0'
                            }}
                        >

                            <input 
                                className="win-textbox" 
                                type="text" 
                                style={{
                                    width: '100%'
                                }}
                            />

                        </ReactWinJS.ToolBar.ContentCommand>
                        <ReactWinJS.ToolBar.Button
                            key="search"
                            icon="zoom"
                            label="Search"
                            priority={1}
                            />
                    </ReactWinJS.ToolBar>
    
                    <h3 style={{paddingLeft: '10px'}}>{this.state.labelList}</h3>
    
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.state.list.dataSource}
                        itemTemplate={this.itemRenderer}
                        layout={this.state.layout}
                        selectionMode="single"
                        tapBehavior="directSelect"
                        onContentAnimating={this.handleContentAnimating}
                        onSelectionChanged={this.handleSelectionChanged}
                    />
    
                    {showAll}
    
                    <div className="separator" />
    
                    <div className="itemList" onClick={()=> this.changeSelectItem('feedback')}>
                        <span className="messageIcon" style={{marginRight: '5px'}}/>
                        Send feedback
                    </div>
                </div>
          )
        }

    }
}