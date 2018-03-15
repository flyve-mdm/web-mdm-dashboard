import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
InvitationsItemList.propTypes = {
    itemList: PropTypes.object.isRequired
}