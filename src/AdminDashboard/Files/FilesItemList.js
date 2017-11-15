import React, { Component } from 'react'

export default class FilesItemList extends Component {
    render() {
        let size = this.props.size
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmFile.name"]}</div>
                <div className="detail">{this.props.itemList["PluginFlyvemdmFile.source"]}</div>
            </div>
        )
    }
}
