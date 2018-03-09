import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'

export default class DevicesContent extends Component {

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.data.itemListPaneWidth} updateAnimation={true} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">

                        <Main 
                            data={{
                                selectedItems: this.props.data.selectedItems,
                                changeAction: this.props.data.changeAction,
                                changeSelectionMode: this.props.data.changeSelectionMode,
                                setNotification: this.props.data.setNotification,
                                history: this.props.data.history,
                                glpi: this.props.data.glpi
                            }}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header="System Report">

                        <SystemReport 
                            data={{
                                selectedItems: this.props.data.selectedItems,
                                glpi: this.props.data.glpi
                            }}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header="Applications">
                        
                        <Applications 
                            data={{
                                selectedItems: this.props.data.selectedItems,
                                glpi: this.props.data.glpi
                            }}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <Geolocation 
                            data={{
                                selectedItems: this.props.data.selectedItems,
                                changeAction: this.props.data.changeAction,
                                changeSelectionMode: this.props.data.changeSelectionMode,
                                setNotification: this.props.data.setNotification,
                                glpi: this.props.data.glpi
                            }}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">

                        <DangerZone 
                            data={{
                                selectedItems: this.props.data.selectedItems,
                                changeAction: this.props.data.changeAction,
                                action: this.props.data.action,
                                changeSelectionMode: this.props.data.changeSelectionMode,
                                setNotification: this.props.data.setNotification,
                                glpi: this.props.data.glpi
                            }}
                        />

                    </ReactWinJS.Pivot.Item>
                </ReactWinJS.Pivot>
            </ContentPane>
        )
    }
}
DevicesContent.propTypes = {
    data: PropTypes.shape({
        itemListPaneWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        action: PropTypes.string,
        changeAction: PropTypes.func.isRequired,
        selectedItems: PropTypes.array.isRequired,
        setNotification: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        glpi: PropTypes.object.isRequired
    })
}
