import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IconItemList from '../../../components/IconItemList'

export default class ApplicationsItemList extends PureComponent {
    render() {
        let image
        if (this.props.itemList["PluginFlyvemdmPackage.icon"]) {
            image = (
                <IconItemList 
                    size={this.props.size} 
                    image={"data:image/png;base64, " + this.props.itemList["PluginFlyvemdmPackage.icon"]} 
                    type="base64"
                    backgroundColor="transparent"
                />
            )
        } else {
            image = (
                <div 
                style={{ 
                    display: 'inline-block',
                    width: this.props.size, 
                    height: this.props.size,
                    fontSize: '25px',
                    textAlign: 'center',
                    verticalAlign: 'super'
                }}>
                    <span className="documentIcon"/>
                </div>
            )
        }
        return (
            <div>
                {image}
                <div style={{ marginLeft: 5, display: 'inline-block' }}>
                    <div className="name">{this.props.itemList["PluginFlyvemdmPackage.alias"]}</div>
                    <div className="detail">{this.props.itemList["PluginFlyvemdmPackage.name"]}</div>
                </div>
            </div>
        )
    }
}

ApplicationsItemList.propTypes = {
    itemList: PropTypes.object
}