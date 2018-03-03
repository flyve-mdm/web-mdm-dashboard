import React, { Component } from 'react'

export default class InvitationsItemList extends Component {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmInvitation.User.name"]}</div>
                <div className="detail">{this.props.itemList["PluginFlyvemdmInvitation.status"]}</div>
            </div>
        )
    }
}
