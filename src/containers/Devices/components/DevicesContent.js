import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'
import { I18n } from 'react-i18nify'
import getID from '../../../shared/getID'

export default class DevicesContent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            id: getID(this.props.history.location.pathname)
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== getID(this.props.history.location.pathname)) {
            this.setState({
                id: getID(this.props.history.location.pathname)
            })
        }
    }

    render() {
        return (
            <ContentPane>
                <ReactWinJS.Pivot>
                    <ReactWinJS.Pivot.Item key="main" header={I18n.t('devices.main.title')}>

                        <Main 
                            id={this.state.id}
                            changeAction={this.props.changeAction}
                            changeSelectionMode={this.props.changeSelectionMode}
                            setNotification={this.props.setNotification}
                            handleMessage={this.props.handleMessage}
                            history={this.props.history}
                            glpi={this.props.glpi}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="systemReport" header={I18n.t('devices.system_report.title')}>

                        <SystemReport 
                            id={this.state.id}
                            glpi={this.props.glpi}
                            setNotification={this.props.setNotification}
                            handleMessage={this.props.handleMessage}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="applications" header={I18n.t('devices.applications.title')}>
                        
                        <Applications 
                            id={this.state.id}
                            glpi={this.props.glpi}
                            handleMessage={this.props.handleMessage}
                        />

                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="geolocation" header={I18n.t('devices.geolocation.title')}>
                        <Geolocation 
                            id={this.state.id}
                            setNotification={this.props.setNotification}
                            handleMessage={this.props.handleMessage}
                            glpi={this.props.glpi}
                        />
                    </ReactWinJS.Pivot.Item>
                    <ReactWinJS.Pivot.Item key="dangerZone" header={I18n.t('devices.danger_zone.title')}>

                        <DangerZone 
                            id={this.state.id}
                            changeAction={this.props.changeAction}
                            setNotification={this.props.setNotification}
                            handleMessage={this.props.handleMessage}
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
    changeSelectionMode: PropTypes.func.isRequired,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    glpi: PropTypes.object.isRequired
}
