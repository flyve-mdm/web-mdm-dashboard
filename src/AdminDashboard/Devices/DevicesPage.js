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
                    <h2 className="win-h2" style={{ marginTop: '10px', marginLeft: '10px', marginBottom: '20px' }}> {this.props.location[0]} </h2>
                        <div className="personInfo">
                            <IconItemList size={72} />
                            <div className="profileStatus">
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
                    <div className="profileContent">
                        <ul>
                            <li>
                                <div className="callContent">
                                    <div>Version</div>
                                    <div className="number">{ selectedItemList["PluginFlyvemdmAgent.version"] }</div>
                                </div>
                            </li>
                            <li>
                                <div className="callContent">
                                    <div>Fleets</div>
                                    <div className="number">{ selectedItemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"] }</div>
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
    itemList: PropTypes.object.isRequired
}
