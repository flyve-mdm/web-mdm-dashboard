import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconItemList from '../../../components/IconItemList'

export default class UsersItemList extends PureComponent {
    render() {
        const imageProfile = this.props.itemList['User.picture'] ? this.props.itemList['User.picture'] : "profile.png"
        return (
            <div>
                <IconItemList image={imageProfile} size={42} />
                <div style={{ display: 'inline-block' }}>
                    <div className="name">{this.props.itemList['User.name']}</div>
                    <div className="detail">{this.props.itemList['User.realname']}</div>
                </div>
            </div>
        )
    }
}
UsersItemList.propTypes = {
    itemList: PropTypes.object.isRequired
}
