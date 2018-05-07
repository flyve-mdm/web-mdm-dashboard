import React, { PureComponent } from 'react'
import IconItemList from '../../IconItemList'

export default class UsersItemList extends PureComponent {
    render() {
        const imageProfile = this.props.itemList['User.picture'] ? this.props.itemList['User.picture'] : "profile.png"
        return (
            <div>
                <IconItemList 
                    image={imageProfile} 
                    size={42} 
                    isMin 
                />
                <div style={{ display: 'inline-block' }}>
                    <div className="name">{this.props.itemList['User.name']}</div>
                    <div className="detail">{this.props.itemList['User.realname']}</div>
                </div>
            </div>
        )
    }
}
