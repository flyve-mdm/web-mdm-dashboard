import React, { Component } from 'react'
import IconItemList from '../IconItemList'

export default class UsersItemList extends Component {
    render() {
        console.log(this.props.itemList)
        let imageProfile = this.props.itemList['User.picture'] ? this.props.itemList['User.picture'] : "profile.png"
        return (
            <div>
                <IconItemList image={imageProfile} size={42} />
                <div style={{ display: 'inline-block' }}>
                    <div className="name">{this.props.itemList['User.name']}</div>
                    <div className="detail">{this.props.itemList['User.UserEmail.email']}</div>
                </div>
            </div>
        )
    }
}
