import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import BytesToSize from '../../Utils/BytesToSize'

export default class ApplicationsPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div className="profileHeader">
                        <h2 className="win-h2" style={{ marginLeft: '10px' }}> {this.props.location[0]} </h2>
                        <div className="personInfo">
                            <IconItemList size={72} />
                            <div className="profileStatus">
                                <div className="detail">{this.props.itemList["PluginFlyvemdmPackage.name"]}</div>
                                <div className="detail">{this.props.itemList["PluginFlyvemdmPackage.filesize"]}</div>
                                <div className="detail">{BytesToSize(this.props.itemList["PluginFlyvemdmPackage.filesize"])}</div>
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
