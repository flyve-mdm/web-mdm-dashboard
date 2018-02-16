import React, { Component } from 'react'
import IconItemList from '../IconItemList'

export default class UsersItemList extends Component {
    render() {
        const imageProfile = this.props.itemList['User.picture'] ? this.props.itemList['User.picture'] : "profile.png"
        const email = this.props.itemList['User.UserEmail.email'] ? 
            Array.isArray(this.props.itemList['User.UserEmail.email']) ? 
                this.props.itemList['User.UserEmail.email'][0] 
                    : this.props.itemList['User.UserEmail.email'] 
                        : ''
        return (
            <div>
                <IconItemList image={imageProfile} size={42} />
                <div style={{ display: 'inline-block' }}>
                    <div className="name">{this.props.itemList['User.name']}</div>
                    <div className="detail">{ email }</div>
                </div>
            </div>
        )
    }
}
