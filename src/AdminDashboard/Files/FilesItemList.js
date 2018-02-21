import React, { Component } from 'react'

export default class FilesItemList extends Component {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmFile.name"]}</div>
            </div>
        )
    }
}
