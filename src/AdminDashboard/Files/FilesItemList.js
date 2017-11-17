import React, { Component } from 'react'
import BytesToSize from '../../Utils/BytesToSize'

export default class FilesItemList extends Component {
    render() {
        return (
            <div style={{ display: 'inline-block' }}>
                <div className="name">{this.props.itemList["PluginFlyvemdmFile.name"]}</div>
                <div className="detail">{BytesToSize(this.props.itemList["PluginFlyvemdmFile.filesize"])}</div>
            </div>
        )
    }
}
