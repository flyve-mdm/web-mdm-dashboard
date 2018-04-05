import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../../components/Confirmation'
import { I18n } from 'react-i18nify'
import itemtype from '../../../../shared/itemtype'
import location from '../../../../shared/location'

class DangerZone extends Component {

    wipe = async () => {
        const isOK = await Confirmation.isOK(this.wipeDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.props.id,
                    input: {"wipe": "1"}
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.data_deleted_successfully'),
                    type: 'success'
                })
                this.props.changeAction("reload")
                this.props.history.push(`${location.pathname}/app/devices`)
            } catch (error) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
        }
    }

    unenroll = async () => {
        const isOK = await Confirmation.isOK(this.unenrollmentDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.props.id,
                    input: {"_unenroll": "1"}
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.unenrollment_device'),
                    type: 'success'
                })
                this.props.changeAction("reload")
                this.props.history.push(`${location.pathname}/app/devices`)
            } catch (error) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
        }
    }

    delete = async () => {
        const isOK = await Confirmation.isOK(this.deleteDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.deleteItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.props.id,
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.devices_successfully_deleted'),
                    type: 'success'
                })
                this.props.changeAction("reload")
                this.props.history.push(`${location.pathname}/app/devices`)
            } catch (error) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
        }
    }

    render() {
        return ( 
            <div>
                <div className="listElement">
                    <div className="message">
                        {I18n.t('devices.danger_zone.wipe')}
                        <div className="detail">
                            {I18n.t('devices.danger_zone.wipe_description')}
                        </div>
                    </div>
                    <div className="controller">
                        <button className="btn --primary" onClick={this.wipe}>
                            {I18n.t('commons.wipe')}
                        </button>
                    </div>
                    <Confirmation 
                        title={I18n.t('devices.danger_zone.last_warning')}
                        message={I18n.t('devices.danger_zone.last_warning_message')}
                        reference={el => this.wipeDevice = el} 
                    /> 
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('devices.danger_zone.unenrollment')}
                        <div className="detail">
                            {I18n.t('devices.danger_zone.unenrollment_description')}
                        </div>
                    </div>
                    <div className="controller">
                        <button className="btn --primary" onClick={this.unenroll}>
                            {I18n.t('commons.unenroll')}
                        </button>
                    </div>
                    <Confirmation 
                        title={`${I18n.t('devices.danger_zone.unenroll_device')} # ${this.props.id}`} 
                        message={`${I18n.t('devices.danger_zone.going_to_unenroll')} ${this.props.id}`} 
                        reference={el => this.unenrollmentDevice = el} 
                    /> 
                </div>

                <div className="listElement">
                    <div className="message">
                        {I18n.t('devices.danger_zone.delete')}
                        <div className="detail">
                            {I18n.t('devices.danger_zone.delete_description')}
                        </div>
                    </div>
                    <div className="controller">
                        <button className="btn --primary" onClick={this.delete}>
                            {I18n.t('commons.delete')}
                        </button>
                    </div>
                    <Confirmation 
                        title={`${I18n.t('devices.danger_zone.delete')} # ${this.props.id}`} 
                        message={`${I18n.t('devices.danger_zone.delete_message')} ${this.props.id}`} 
                        reference={el => this.deleteDevice = el} 
                    /> 
                </div>
            </div>
        )
    }
}

DangerZone.propTypes = {
    id: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    changeAction: PropTypes.func.isRequired
}

export default DangerZone