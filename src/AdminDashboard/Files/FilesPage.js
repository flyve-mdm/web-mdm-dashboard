import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import BytesToSize from '../../Utils/BytesToSize'
import FilesAdd from './FilesAdd'
import FilesEdit from './FilesEdit'
import EmptyMessage from '../../Utils/EmptyMessage'

export default class FilesPage extends Component {

    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            if(this.props.actionList === null) {
                return (
                    <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
                )
            } else {
                switch (this.props.actionList) {
                    case "Edit":    
                        return (
                            <FilesEdit
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
                                <h2 className="win-h2 titleContentPane" > New File </h2>
                            </div>
                            <FilesAdd
                            dataSource={this.props.dataSource} 
                            changeDataSource={this.props.changeDataSource} 
                            location={this.props.location}
                            changeActionList={this.props.changeActionList}/>
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
            if(selectedItemList !== undefined) {
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                            <div className="itemInfo">
                                <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px'}} />
                                <div className="contentStatus">
                                    <div className="name">{selectedItemList["PluginFlyvemdmFile.name"]}</div>
                                    <div className="detail">{BytesToSize(selectedItemList["PluginFlyvemdmFile.filesize"])}</div>
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
FilesPage.propTypes = {
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
