import React, { Component } from 'react'
import ReactWinJS from 'react-winjs'
import InvitationsLog from '../data/invitationsLog.json'
import WinJS from 'winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import ItemList from '../ItemList'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class InvitationsPendingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout }
        }
    }

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <div style={{ padding: '14px', width: '100%' }}>
                <b>{ItemList.data['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitationlog.event']}</b>
                <br />
                {ItemList.data['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitationlog.date_creation']}
            </div>
        )
    })

    render() {
        let currentLog = []

        for (let index = 0; index < InvitationsLog.data.length; index++) {
            const element = InvitationsLog.data[index]
            if (element['PluginFlyvemdmInvitationLog.PluginFlyvemdmInvitation.id'] === this.props.currentItem['PluginFlyvemdmInvitation.id']) {
                currentLog.push(element)
            }
        }

        if (currentLog.length > 0) {
            let currentListItemLogs = ItemList('InvitationsLog', currentLog)

            return (
                <div className="contentPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" >Pending {this.props.location[0]} </h2>
                    </div>
                    <ReactWinJS.ListView
                        ref="listView"
                        className="contentListView win-selectionstylefilled"
                        style={{ height: 'calc(100% - 48px)' }}
                        itemDataSource={currentListItemLogs.dataSource}
                        itemTemplate={this.ItemListRenderer}
                        layout={this.state.layout}
                        onContentAnimating={this.handleContentAnimating}
                        selectionMode={'single'}
                    />
                </div>
            )
        } else {

            return (
                <EmptyMessage message="No Logs Available" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }
    }
}
