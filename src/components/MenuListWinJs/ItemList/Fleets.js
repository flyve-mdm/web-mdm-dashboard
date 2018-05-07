import React, { PureComponent } from 'react'

export default class FleetsItemList extends PureComponent {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmFleet.name"]}</div>
            </div>
        )
    }
}
