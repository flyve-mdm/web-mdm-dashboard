import React, { Component } from 'react'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'

export default class FleetsContent extends Component {
    render() {

        let selectedItemList = null
        this.props.currentItem !== null ? selectedItemList = this.props.currentItem : selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)

        return ( 
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} />
                        <div className="contentStatus">
                            <div className="name">{selectedItemList["PluginFlyvemdmFleet.name"]}</div>
                        </div>
                    </div>
                </div>
                <div className="separator" />
            </div>
        )
    }
}