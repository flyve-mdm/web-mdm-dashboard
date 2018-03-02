import React, { Component } from 'react'
import IconItemList from '../../IconItemList'

export default class ApplicationsItemList extends Component {
    render() {
        let image = "data:image/png;base64, " + this.props.itemList["PluginFlyvemdmPackage.icon"]
        return (
            <div>
                <IconItemList 
                    size={42} 
                    image={image} 
                    type="base64"
                    backgroundColor="transparent"
                />
                <div style={{ marginLeft: 5, display: 'inline-block' }}>
                    <div className="name">{this.props.itemList["PluginFlyvemdmPackage.alias"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmPackage.name"]}</div>
                </div>
            </div>
        )
    }
}
