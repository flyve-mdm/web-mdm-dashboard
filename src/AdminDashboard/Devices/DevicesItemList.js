import React, { Component } from 'react'

export default class DevicesItemList extends Component {
    render() {
        let size = this.props.size
        return (
            <div>
                <div
                    className="profilePicture"
                    style={{
                        backgroundColor: '#e6e6e6',
                        width: size,
                        height: size,
                        WebkitBorderRadius: size,
                        MozBorderRadius: size,
                        borderRadius: size,
                        backgroundSize: 'cover',
                        display: 'inline-block'
                    }}
                >
                    <img src="images\" height={size} width={size} alt="" />
                </div>
                <div style={{ display: 'inline-block'}}>
                    <div className="name">{this.props.itemList["PluginFlyvemdmAgent.Computer.User.realname"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.name"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.Computer.serial"]}</div>
                </div>
            </div>
        )
    }
}
