import React, { PureComponent } from 'react'

export default class InvitationsItemList extends PureComponent {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="list-pane__name">{this.props.itemList["PluginFlyvemdmInvitation.User.name"]}</div>
                <div className="list-pane__detail">{this.props.itemList["PluginFlyvemdmInvitation.status"]}</div>
            </div>
        )
    }
}
