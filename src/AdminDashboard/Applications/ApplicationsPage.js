import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import BytesToSize from '../../Utils/BytesToSize'
import ApplicationsAdd from './ApplicationsAdd'

export default class ApplicationsPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            if (this.props.actionList === null) {
                return (
                    <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                        </div>
                    </div>
                )
            } else {
                switch (this.props.actionList) {

                    case "Add":
                        return (
                            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                                <div className="contentHeader">
                                    <h2 className="win-h2 titleContentPane" > New Application </h2>
                                </div>
                                <ApplicationsAdd
                                    location={this.props.location}
                                    itemList={this.props.itemList}
                                    changeItemList={this.props.changeItemList}
                                    changeActionList={this.props.changeActionList} />
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
            let image = "data:image/png;base64, " + selectedItemList["PluginFlyvemdmPackage.icon"]
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
        }
    }
}
ApplicationsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.number,
    itemList: PropTypes.object.isRequired
}
