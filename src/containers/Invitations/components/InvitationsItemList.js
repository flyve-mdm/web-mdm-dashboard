import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18nify'

export default class InvitationsItemList extends PureComponent {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="list-pane__name">{(this.props.itemList["PluginFlyvemdmInvitation.User.name"] || I18n.t('commons.name_not_available'))}</div>
                <div className="list-pane__detail">{this.props.itemList["PluginFlyvemdmInvitation.status"]}</div>
            </div>
        )
    }
}
InvitationsItemList.propTypes = {
    itemList: PropTypes.object.isRequired
}