import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pluralize from 'pluralize'
import ContentPane from '../../Utils/ContentPane'
import BytesToSize from '../../Utils/BytesToSize'
import Confirmation from '../../Utils/Confirmation'

export default class FilesContent extends Component {

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            let item = this.props.dataSource.itemList
            let index = this.props.selectedIndex
            index.sort()
            index.reverse()
            index.forEach((i) => {
                item.splice(i, 1)
            })

            this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
            this.props.onNavigate([this.props.location[0]])
        }
    }

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {Pluralize.singular(this.props.location[0])} </h2>
                    <div className="itemInfo">
                        <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px' }} />
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList["PluginFlyvemdmFile.name"]}</div>
                            <div className="detail">{BytesToSize(this.props.selectedItemList["PluginFlyvemdmFile.filesize"])}</div>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeActionList('Edit')} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList["PluginFlyvemdmFile.name"]} reference={el => this.contentDialog = el} />
            </ContentPane>
        )
    }
}
FilesContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedItemList: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired
}
