import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'
import Invitations from './Invitations'
import Enroll from './Enroll'

export default class DevicesPage extends Component {

    render() {
        if (this.props.selectedIndex === null) {
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
                    
                    case "Pending Invitation":
                        return (
                            <div className="contentPane listPane" style={{ height: '100%', padding: '0', width: Calc100PercentMinus(this.props.itemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                                <Invitations changeActionList={this.props.changeActionList}/>
                            </div>
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
            const selectedItemList = this.props.itemList.getAt(this.props.selectedIndex)            
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
        }
    }
}
DevicesPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedIndex: PropTypes.number,
    itemList: PropTypes.object.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired
}
