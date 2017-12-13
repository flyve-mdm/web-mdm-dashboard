import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import IconItemList from '../IconItemList'
import BytesToSize from '../../Utils/BytesToSize'
import Confirmation from '../../Utils/Confirmation'

export default class ApplicationsContent extends Component {

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

        let image = "data:image/png;base64, " + this.props.selectedItemList["PluginFlyvemdmPackage.icon"]

        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <div className="contentHeader">
                    <h2 className="win-h2" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> {this.props.location[0]} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} image={image} type="base64" />
                        <div className="contentStatus">
                            <div className="name">{this.props.selectedItemList["PluginFlyvemdmPackage.alias"]}</div>
                            <div className="detail">{this.props.selectedItemList["PluginFlyvemdmPackage.name"]}</div>
                            <div className="detail">{BytesToSize(this.props.selectedItemList["PluginFlyvemdmPackage.filesize"])}</div>
                            <span className="source">{this.props.selectedItemList["PluginFlyvemdmFile.source"]}</span>
                            <br />
                            <span className="editIcon" style={{ marginRight: '20px' }} onClick={() => this.props.changeActionList('Edit')} />
                            <span className="deleteIcon" onClick={this.handleDelete} />
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.props.selectedItemList["PluginFlyvemdmPackage.name"]} reference={el => this.contentDialog = el} />
            </ContentPane>
        )
    }
}
ApplicationsContent.propTypes = {
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
