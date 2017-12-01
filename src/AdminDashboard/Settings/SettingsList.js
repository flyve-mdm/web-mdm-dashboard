import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import PropTypes from 'prop-types'

class SettingsList extends Component {

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

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let indices = listView.selection.getIndices()
        this.props.onNavigate([this.props.location, indices[0]])
    }
    
    render () {
        return (
            <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
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
}

SettingsList.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default SettingsList