import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import PropTypes from 'prop-types'
let WinJS = require('winjs')

export default class AboutList extends Component {

    constructor(props) {
        super(props)
        this.state = {
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


    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        if (this.props.selectedIndex != null && this.props.itemList.getAt(this.props.selectedIndex).title === 'Help Center') {
            this.props.changeIsHelpCenter()
            this.props.onNavigate({...this.props.location, index: null})
        } else {
            this.props.onNavigate({...this.props.location, index: index[0]})            
        }
    }

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    render() {
        if (this.props.isHelpCenter) {
            return (
                <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                    <ReactWinJS.ToolBar className="listToolBar">
                        <ReactWinJS.ToolBar.ContentCommand
                            key="content"
                            icon="accept"
                            label="search bar">
                            <input className="win-textbox win-interactive" type="text" />
                        </ReactWinJS.ToolBar.ContentCommand>
                        <ReactWinJS.ToolBar.Button
                            key="search"
                            icon="zoom"
                            label="Search"
                            priority={1}
                        />
                    </ReactWinJS.ToolBar>
    
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.props.itemList.dataSource}
                        itemTemplate={this.itemRenderer}
                        layout={this.state.layout}
                        selectionMode="single"
                        tapBehavior="directSelect" 
                        onContentAnimating={this.handleContentAnimating}
                        onSelectionChanged={this.handleSelectionChanged}
                    />
                </div>
            )
        } else {
            return (
                <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={this.props.itemList.dataSource}
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
    }
}
AboutList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,    
    selectedIndex: PropTypes.number,
    onNavigate: PropTypes.func.isRequired,
    isHelpCenter: PropTypes.bool.isRequired
}
