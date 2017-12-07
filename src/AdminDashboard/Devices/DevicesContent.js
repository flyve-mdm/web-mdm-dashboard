import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import IconItemList from '../IconItemList'
import ContentPane from '../../Utils/ContentPane'


export default class DevicesContent extends Component {

    handleEdit = () => {
        this.props.changeActionList("EditOne")
    }

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">
                        <div>
                            <div className="contentHeader">
                                <h2 className="win-h2 titleContentPane" > {this.props.location[0]} </h2>
                                <div className="itemInfo">
                                    <IconItemList size={72} />
                                    <div className="contentStatus">
                                        <div className="name">{this.props.selectedItemList["PluginFlyvemdmAgent.Computer.User.realname"]}</div>

                                        <div className="message">
                                            {
                                                this.props.selectedItemList["PluginFlyvemdmAgent.is_online"] === 1 ? 'Online' : 'Offline'
                                            }
                                        </div>
                                        <div className="source">{this.props.selectedItemList["PluginFlyvemdmAgent.last_contact"]} last contact</div>
                                        <br />
                                        <span className="editIcon" onClick={this.handleEdit} />
                                    </div>
                                </div>
                            </div>
                            <div className="separator" />
                            <div className="contentInfo">
                                <ul>
                                    <li>
                                        <div className="callContent">
                                            <div className="title">Version</div>
                                            <div>{this.props.selectedItemList["PluginFlyvemdmAgent.version"]}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="callContent">
                                            <div className="title">Fleets</div>
                                            <div>{this.props.selectedItemList["PluginFlyvemdmAgent.PluginFlyvemdmFleet.name"]}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header="System Report">
                        <div>System Report</div>
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header="Applications">
                        <div>Applications</div>
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <div>Geolocation</div>
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">
                        <div>Danger Zone</div>
                    </ReactWinJS.Pivot.Item>
                </ReactWinJS.Pivot>
            </ContentPane>
        )
    }
}
DevicesContent.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.object.isRequired,
    changeActionList: PropTypes.func.isRequired
}