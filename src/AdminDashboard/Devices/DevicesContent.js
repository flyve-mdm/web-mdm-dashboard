import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../Utils/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'

class DevicesContent extends Component {

    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">

                        <Main 
                            location={this.props.location}
                            onNavigate={this.props.onNavigate}  
                            changeActionList={this.props.changeActionList} 
                            selectedItemList={this.props.selectedItemList} 
                            changeSelectionMode={this.props.changeSelectionMode} 
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header="System Report">

                        <SystemReport 
                            selectedItemList={this.props.selectedItemList}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header="Applications">
                        
                        <Applications 
                            selectedItemList={this.props.selectedItemList}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <Geolocation 
                            itemListPaneWidth={this.props.itemListPaneWidth}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">

                        <DangerZone 
                            selectedItemList={this.props.selectedItemList}
                            showNotification={this.props.showNotification}
                        />

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
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedItemList: PropTypes.array,
    changeActionList: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

export default DevicesContent