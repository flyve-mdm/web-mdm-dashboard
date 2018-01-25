import React, { Component } from 'react'
import IconItemList from '../IconItemList'

export default class DevicesItemList extends Component {
    render() {
        let size = this.props.size
        return (
            <div>
                <IconItemList size={size}/>
                <div style={{ display: 'inline-block'}}>
                    <div className="name">{this.props.itemList["PluginFlyvemdmAgent.name"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.mdm_type"].toUpperCase()}</div>
                </div>
            </div>
        )
    }
}
