import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'

class DevicesContent extends Component {

    render() {
        console.log(this.props.selectedItemList)
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} updateAnimation={true} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">

                        <Main 
                            location={this.props.location}
                            selectedItemList={this.props.selectedItemList} 
                            changeAction={this.props.changeAction} 
                            changeSelectionMode={this.props.changeSelectionMode} 
                            onNavigate={this.props.onNavigate}  
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
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <Geolocation 
                            itemListPaneWidth={this.props.itemListPaneWidth}
                            selectedItemList={this.props.selectedItemList}
                            showNotification={this.props.showNotification}
                            glpi={this.props.glpi}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">

                        <DangerZone 
                            selectedItemList={this.props.selectedItemList}
                            showNotification={this.props.showNotification}
                            location={this.props.location}
                            onNavigate={this.props.onNavigate} 
                            changeAction={this.props.changeAction}
                            action={this.props.action}
                            glpi={this.props.glpi}
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
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    action: PropTypes.string
}

export default DevicesContent