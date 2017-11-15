import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import LICENCE from './LICENCE.md'
import ReactMarkdown from 'react-markdown' 
let WinJS = require('winjs')
export default class AboutPage extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List([
                { title: "Overview" },
                { title: "System information" },
                { title: "Help Center" },
                { title: "Contact" },
                { title: "Release notes" },
                { title: "Term of use" },
                { title: "License"}
            ]),
            layout: { type: WinJS.UI.ListLayout }
        }

    }
    
    itemRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                {item.data.title}
            </div>
        )
    })

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    renderItemListPane(ItemListPaneWidth) {

        return (
            <div className="peopleSearchPane" style={{ height: '100%', width: ItemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                <ReactWinJS.ListView
                    ref="listView"
                    className="listViewExample win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.state.list.dataSource}
                    itemTemplate={this.itemRenderer}
                    layout={this.state.layout}
                    selectionMode="single"
                    tapBehavior="directSelect" 
                    onContentAnimating={this.handleContentAnimating}
                    onSelectionChanged={this.handleSelectionChanged}
                />
            </div>
        )
    }

    renderContentPane(selectedIndex, ItemListPaneWidth) {
        if (selectedIndex === null) {
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(ItemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedItemList = this.state.list.getAt(selectedIndex)
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(ItemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <h1>{ selectedItemList.title }</h1>
                    <ReactMarkdown source={LICENCE} />
                </div>
            )
        }
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let indices = listView.selection.getIndices()
        this.props.onNavigate([this.props.location, indices[0]])
    }
    
    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null
        
        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return this.renderItemListPane('100%')
            } else {
                return this.renderContentPane(selectedIndex, 0)
            }
        } else {
            let ItemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    {this.renderItemListPane(ItemListPaneWidth)}
                    {this.renderContentPane(selectedIndex, ItemListPaneWidth)}
                </div>
            )
        }
    }
}