import React, { Component } from 'react'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'

export default class FleetsContent extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    handleAddPolicy = () => {
        console.log(this.props)
        this.props.changeActionList('Add Policies')
        this.props.onNavigate([this.props.location[0]])
    }

    render() {

        return ( 
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                <div className="contentHeader">
                    <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                    <div className="itemInfo">
                        <IconItemList size={72} />
                        <div className="contentStatus">
                            <div className="name">{this.props.currentItem["PluginFlyvemdmFleet.name"]}</div>
                        </div>
                    </div>
                </div>
                <div className="separator" />
                <div className="contentInfo" style={{ width: '100%', marginTop: '20px', display: 'inline-block' }} >
                    <h3 className="win-h3" style={{ display: 'inline-block' }} > Tasks </h3>
                    <div style={{ float: 'right', textAlign: 'center', display: 'inline-block' }}>
                        <span className="addIcon" style={{ fontSize: '18px' }} onClick={this.handleAddPolicy}></span>
                    </div>
                </div>
            </div>
        )
    }
}