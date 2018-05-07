import React, { PureComponent } from 'react'

export default class FilesItemList extends PureComponent {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmFile.name"]}</div>
            </div>
        )
    }
}
