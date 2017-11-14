import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import IconItemList from '../IconItemList'

export default class DevicesPage extends Component {

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
                        <div className="name">{selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"]}</div>
                        <div className="personInfo">
                            <IconItemList size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {
                                        selectedItemList["PluginFlyvemdmAgent.is_online"] === 1 ? 'Online' : 'Offline'
                                    }
                                </span>
                                <span className="source">{selectedItemList["PluginFlyvemdmAgent.last_contact"]} last contact</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
                        <ul>
                            <li><span className="emailIcon" />Email work</li>
                            <li><span />{ selectedItemList["PluginFlyvemdmAgent.name"]}</li>
                            <li><span className="emailIcon" />Email work</li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Mobile</a>
                                    <div className="number">{selectedItemList.mobilePhone}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedItemList.workPhone}</div>
                                </div>
                            </li>
                            <li><span className="phoneIcon" />Call using an app</li>
                            <li><span className="videoCallIcon" />Video call</li>
                            <li><span className="emailIcon" />Email work</li>
                            <li><span className="mapIcon" />Map home</li>
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
    itemList: PropTypes.object.isRequired
}
