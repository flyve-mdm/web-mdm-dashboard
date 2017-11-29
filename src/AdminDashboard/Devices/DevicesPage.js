import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import Enroll from './Enroll'
import DevicesEdit from './DevicesEdit'

export default class DevicesPage extends Component {

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
                            <DevicesEdit
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            onNavigate={this.props.onNavigate}
                            location={this.props.location}
                            itemList={this.props.itemList}
                            changeItemList={this.props.changeItemList}
                            changeActionList={this.props.changeActionList} />
                        )
                    case "Add":
                        return (
                            <div className="contentPane listPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                                <Enroll changeActionList={this.props.changeActionList}/>
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
            console.log(this.props.itemList)
            console.log(this.props.selectedIndex)
            console.log(this.props.itemList.getAt(this.props.selectedIndex))
            const selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)
            if(selectedItemList !== undefined) {
                return (
                    <div className="contentPane" style={{ height: '100%', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                        <div className="contentHeader">
                            <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                            <div className="itemInfo">
                                <IconItemList size={72} />
                                <div className="contentStatus">
                                    <div className="name">{selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"]}</div>
                                    
                                    <div className="message">
                                        {
                                            selectedItemList["PluginFlyvemdmAgent.is_online"] === 1 ? 'Online' : 'Offline'
                                        }
                                    </div>
                                    <div className="source">{selectedItemList["PluginFlyvemdmAgent.last_contact"]} last contact</div>
                                </div>
                            </div>
                        </div>
                        <div className="separator" />
                        <div className="contentInfo">
                            <ul>
                                <li>
                                    <div className="callContent">
                                        <div className="title">Version</div>
                                        <div>{ selectedItemList["PluginFlyvemdmAgent.version"] }</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="callContent">
                                        <div className="title">Fleets</div>
                                        <div>{ selectedItemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"] }</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
DevicesPage.propTypes = {
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
    changeItemList: PropTypes.func.isRequired
}
