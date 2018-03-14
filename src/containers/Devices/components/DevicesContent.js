import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'

export default class DevicesContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: this.props.history.location.pathname.split("/")[3]
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== newProps.history.location.pathname.split("/")[3]) {
            this.setState({
                id: newProps.history.location.pathname.split("/")[3]
            })
        }
    }

    render() {
        return (
            <ContentPane updateAnimation={false} >
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header="Main">

                        <Main 
                            id={this.state.id}
                            changeAction={this.props.changeAction}
                            changeSelectionMode={this.props.changeSelectionMode}
                            setNotification={this.props.setNotification}
                            history={this.props.history}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header="System Report">

                        <SystemReport 
                            id={this.state.id}
                            glpi={this.props.glpi}
                            setNotification={this.props.setNotification}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header="Applications">
                        
                        <Applications 
                            id={this.state.id}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header="Geolocation">
                        <Geolocation 
                            id={this.state.id}
                            changeAction={this.props.changeAction}
                            changeSelectionMode={this.props.changeSelectionMode}
                            setNotification={this.props.setNotification}
                            glpi={this.props.glpi}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header="Danger Zone">

                        <DangerZone 
                            id={this.state.id}
                            changeAction={this.props.changeAction}
                            setNotification={this.props.setNotification}
                            glpi={this.props.glpi}
                            history={this.props.history}
                        />

                    </ReactWinJS.Pivot.Item>
                </ReactWinJS.Pivot>
            </ContentPane>
        )
    }
}
DevicesContent.propTypes = {
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}
