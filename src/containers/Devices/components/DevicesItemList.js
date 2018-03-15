import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconItemList from '../../../components/IconItemList'

export default class DevicesItemList extends Component {
    render() {
        let size = this.props.size
        let imageAgent = this.props.itemList["PluginFlyvemdmAgent.mdm_type"] ? `${this.props.itemList["PluginFlyvemdmAgent.mdm_type"]}.png` : null
        let iconComponent 
        
        if (imageAgent) {
            iconComponent = <IconItemList image={imageAgent} size={size} backgroundColor="transparent"/>
        } else {
            iconComponent = <IconItemList size={size} />
        }
        
        return (
            <div>
                {iconComponent}
                <div style={{ display: 'inline-block'}}>
                    <div className="name">{this.props.itemList["PluginFlyvemdmAgent.name"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmAgent.mdm_type"].toUpperCase()}</div>
                </div>
            </div>
        )
    }
}
DevicesItemList.propTypes = {
    itemList: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired
}
