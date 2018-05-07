import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import { DangerZone, Main, SystemReport, Applications, Geolocation } from './Sections'
import { I18n } from 'react-i18nify'
import getID from '../../../shared/getID'
import Confirmation from '../../../components/Confirmation'

export default class DevicesContent extends PureComponent {

    constructor (props) {
        super(props)
        this.state = {
            id: getID(this.props.history.location.pathname),
            selectedIndex: 0
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.id !== getID(this.props.history.location.pathname)) {
            this.setState({
                id: getID(this.props.history.location.pathname)
            })
        }
    }

    changeselectedItem = (pivot) => {
        if (pivot) {
            if (pivot.winControl.selectedIndex !== this.state.selectedIndex) {
                this.setState({selectedIndex: pivot.winControl.selectedIndex})
            }
            pivot.winControl.onselectionchanged = (event) => {
                this.setState({selectedIndex: event.detail.index})
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Confirmation 
                    title={I18n.t('devices.danger_zone.last_warning')}
                    message={I18n.t('devices.danger_zone.last_warning_message')}
                    reference={el => this.wipeDevice = el} 
                /> 
                <Confirmation 
                    title={`${I18n.t('devices.danger_zone.unenroll_device')} # ${this.props.id}`} 
                    message={`${I18n.t('devices.danger_zone.going_to_unenroll')} ${this.props.id}`} 
                    reference={el => this.unenrollmentDevice = el} 
                /> 
                <Confirmation 
                    title={`${I18n.t('devices.danger_zone.delete')} # ${this.props.id}`} 
                    message={`${I18n.t('devices.danger_zone.delete_message')} ${this.props.id}`} 
                    reference={el => this.deleteDevice = el} 
                /> 
                <ContentPane className="devices">
                    <ReactWinJS.Pivot ref={this.changeselectedItem}>
                        <ReactWinJS.Pivot.Item key="main" header={I18n.t('devices.main.title')}>

                            <Main 
                                id={this.state.id}
                                changeAction={this.props.changeAction}
                                changeSelectionMode={this.props.changeSelectionMode}
                                setNotification={this.props.setNotification}
                                handleMessage={this.props.handleMessage}
                                history={this.props.history}
                                glpi={this.props.glpi}
                                update={this.state.selectedIndex === 0}
                            />

                        </ReactWinJS.Pivot.Item>
                        <ReactWinJS.Pivot.Item key="systemReport" header={I18n.t('devices.system_report.title')}>

                            <SystemReport 
                                id={this.state.id}
                                glpi={this.props.glpi}
                                setNotification={this.props.setNotification}
                                handleMessage={this.props.handleMessage}
                                update={this.state.selectedIndex === 1}
                            />

                        </ReactWinJS.Pivot.Item>
                        <ReactWinJS.Pivot.Item key="applications" header={I18n.t('devices.applications.title')}>
                            
                            <Applications 
                                id={this.state.id}
                                glpi={this.props.glpi}
                                handleMessage={this.props.handleMessage}
                                update={this.state.selectedIndex === 2}
                            />

                        </ReactWinJS.Pivot.Item>
                        <ReactWinJS.Pivot.Item key="geolocation" header={I18n.t('devices.geolocation.title')}>
                            <Geolocation 
                                id={this.state.id}
                                setNotification={this.props.setNotification}
                                handleMessage={this.props.handleMessage}
                                glpi={this.props.glpi}
                                update={this.state.selectedIndex === 3}
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
                                wipeDevice={this.wipeDevice}
                                unenrollmentDevice={this.unenrollmentDevice}
                                deleteDevice={this.deleteDevice}
                                update={this.state.selectedIndex === 4}
                            />

                        </ReactWinJS.Pivot.Item>
                    </ReactWinJS.Pivot>
                </ContentPane>
            </React.Fragment>
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
