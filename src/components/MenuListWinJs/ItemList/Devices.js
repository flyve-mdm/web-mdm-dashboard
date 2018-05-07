import React, { PureComponent } from 'react'
import IconItemList from '../../IconItemList'

export default class DevicesItemList extends PureComponent {
    render() {
        let imageAgent = this.props.itemList["PluginFlyvemdmAgent.mdm_type"] ? `${this.props.itemList["PluginFlyvemdmAgent.mdm_type"]}.png` : null
        let iconComponent 
        
        if (imageAgent) {
            iconComponent = <IconItemList image={imageAgent} size={42} backgroundColor="transparent"/>
        } else {
            iconComponent = <IconItemList size={42} />
        }
        
        return (
            <div>
                {iconComponent}
                <div style={{ display: 'inline-block'}}>
                    <div className="list-pane__name">{this.props.itemList["PluginFlyvemdmAgent.name"]}</div>
                    <div className="list-pane__detail">{this.props.itemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]}</div>
                    <div className="list-pane__detail">{this.props.itemList["PluginFlyvemdmAgent.mdm_type"].toUpperCase()}</div>
                </div>
            </div>
        )
    }
}
