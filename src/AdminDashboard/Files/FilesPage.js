import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import BytesToSize from '../../Utils/BytesToSize'
import FilesAdd from './FilesAdd'
import FilesEdit from './FilesEdit'

export default class FilesPage extends Component {

    render() {
        if (this.props.selectedIndex === null || this.props.actionList === 'Edit') {
            if(this.props.actionList === null) {
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                        </div>
                    </div>
                )
            } else {
                switch (this.props.actionList) {
                    case "Edit":    
                        return (
                            <FilesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            onNavigate={this.props.onNavigate}
                            location={this.props.location}
                            itemList={this.props.itemList}
                            changeItemList={this.props.changeItemList}
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
                            location={this.props.location}
                            itemList={this.props.itemList} 
                            changeItemList={this.props.changeItemList}
                            changeActionList={this.props.changeActionList}/>
                        </div>
                    )
                    default: 
                    return (
                        <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                            <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                            </div>
                        </div>
                    )
                }
            }
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
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
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                        </div>
                    </div>
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
    selectedIndex: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array
    ]),
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired
}
