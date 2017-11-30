import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class SettingsPage extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            list: new WinJS.Binding.List([
                { title: "Entity" },
                { title: "Profiles" },
                { title: "Security" },
                { title: "Notifications" },
                { title: "Display" }
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
            <div className="listPane" style={{ height: '100%', width: ItemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
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
            </div>
        )
    }

    renderContentPane(selectedIndex, ItemListPaneWidth) {
        return (
            <EmptyMessage message="No Selection" itemListPaneWidth={ItemListPaneWidth} />
        )
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