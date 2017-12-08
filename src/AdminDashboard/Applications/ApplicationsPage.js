import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import BytesToSize from '../../Utils/BytesToSize'
import ApplicationsAdd from './ApplicationsAdd'
import ApplicationsEdit from './ApplicationsEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class ApplicationsPage extends Component {

    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            if (this.props.actionList === null) {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            } else {
                switch (this.props.actionList) {
                    case "Edit":    
                        return (
                            <ApplicationsEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            dataSource={this.props.dataSource}
                            changeDataSource={this.props.changeDataSource}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}
                            changeSelectionMode={this.props.changeSelectionMode}
                            changeActionList={this.props.changeActionList} />
                        )
                    case "Add":
                        return (
                            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                                <div className="contentHeader">
                                    <h2 className="win-h2 titleContentPane" > New Application </h2>
                                </div>
                                <ApplicationsAdd
                                    location={this.props.location}
                                    dataSource={this.props.dataSource}
                                    changeDataSource={this.props.changeDataSource}
                                    changeActionList={this.props.changeActionList} />
                            </div>
                        )
                    default:
                        return (
                            <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                        )
                }
            }
        } else {
            let selectedItemList = this.props.dataSource.itemList.getAt(this.props.selectedIndex)
            let image = "data:image/png;base64, " + selectedItemList["PluginFlyvemdmPackage.icon"]
            if(selectedItemList !== undefined) {
                return (
                    <div className="contentPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                        <div className="contentHeader">
                            <h2 className="win-h2" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> {this.props.location[0]} </h2>
                            <div className="itemInfo">
                                <IconItemList size={72} image={image} type="base64" />
                                <div className="contentStatus">
                                    <div className="name">{selectedItemList["PluginFlyvemdmPackage.alias"]}</div>
                                    <div className="detail">{selectedItemList["PluginFlyvemdmPackage.name"]}</div>
                                    <div className="detail">{BytesToSize(selectedItemList["PluginFlyvemdmPackage.filesize"])}</div>
                                    <span className="source">{selectedItemList["PluginFlyvemdmFile.source"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="separator" />
                    </div>
                )
            } else {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            }
        }
    }
}
ApplicationsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired
}
