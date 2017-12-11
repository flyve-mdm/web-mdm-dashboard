import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import BytesToSize from '../../Utils/BytesToSize'

export default class FilesContent extends Component {
    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                    <div className="itemInfo">
                        <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px' }} />
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList["PluginFlyvemdmFile.name"]}</div>
                            <div className="detail">{BytesToSize(this.props.selectedItemList["PluginFlyvemdmFile.filesize"])}</div>
                            <br />
                            <span className="editIcon" onClick={() => this.props.changeActionList('Edit')} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
            </ContentPane>
        )
    }
}
FilesContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    selectedItemList: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired
}
