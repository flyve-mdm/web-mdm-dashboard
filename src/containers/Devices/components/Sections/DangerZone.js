import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../../components/Confirmation'
import { I18n } from 'react-i18nify'
import itemtype from '../../../../shared/itemtype'
import publicURL from '../../../../shared/publicURL'
import ContentPane from '../../../../components/ContentPane'

class DangerZone extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            update: this.props.update
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
            return {
                ...prevState,
                id: nextProps.id,
                update: nextProps.update
            }
        } else {
            return {
                ...prevState
            }
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
            this.pane.forceAnimation()
        }
    }

    wipe = async () => {
        const isOK = await Confirmation.isOK(this.props.wipeDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.state.id,
                    input: {"wipe": "1"}
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.data_deleted_successfully'),
                    type: 'success'
                })
                this.props.changeAction('reload')
                this.props.history.push(`${publicURL}/app/devices`)
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            }
        }
    }

    unenroll = async () => {
        const isOK = await Confirmation.isOK(this.props.unenrollmentDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.updateItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.state.id,
                    input: {"_unenroll": "1"}
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.unenrollment_device'),
                    type: 'success'
                })
                this.props.changeAction('reload')
                this.props.history.push(`${publicURL}/app/devices`)
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            }
        }
    }

    delete = async () => {
        const isOK = await Confirmation.isOK(this.props.deleteDevice)
        if (isOK) {
            try {
                const response = await this.props.glpi.deleteItem({
                    itemtype: itemtype.PluginFlyvemdmAgent,
                    id: this.state.id,
                })
                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: response[0].message ? response[0].message : I18n.t('notifications.devices_successfully_deleted'),
                    type: 'success'
                })
                this.props.changeAction('reload')
                this.props.history.push(`${publicURL}/app/devices`)
            } catch (error) {
                this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            }
        }
    }

    render() {
        return ( 
            <React.Fragment>

                <ContentPane ref={pane => this.pane = pane}>
                    <div className="list-element">
                        <div className="list-element__message">
                            {I18n.t('devices.danger_zone.wipe')}
                            <div className="list-element__detail">
                                {I18n.t('devices.danger_zone.wipe_description')}
                            </div>
                        </div>
                        <div className="list-element__controller">
                            <button className="btn btn--secondary" onClick={this.wipe}>
                                {I18n.t('commons.wipe')}
                            </button>
                        </div>
                    </div>
    
                    <div className="list-element">
                        <div className="list-element__message">
                            {I18n.t('devices.danger_zone.unenrollment')}
                            <div className="list-element__detail">
                                {I18n.t('devices.danger_zone.unenrollment_description')}
                            </div>
                        </div>
                        <div className="list-element__controller">
                            <button className="btn btn--secondary" onClick={this.unenroll}>
                                {I18n.t('commons.unenroll')}
                            </button>
                        </div>
                        
                    </div>
    
                    <div className="list-element">
                        <div className="list-element__message">
                            {I18n.t('devices.danger_zone.delete')}
                            <div className="list-element__detail">
                                {I18n.t('devices.danger_zone.delete_description')}
                            </div>
                        </div>
                        <div className="list-element__controller">
                            <button className="btn btn--secondary" onClick={this.delete}>
                                {I18n.t('commons.delete')}
                            </button>
                        </div>
    
                    </div>
                </ContentPane>
            </React.Fragment>
        )
    }
}

DangerZone.propTypes = {
    id: PropTypes.string.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    changeAction: PropTypes.func.isRequired,
    update: PropTypes.bool.isRequired,
    wipeDevice: PropTypes.object,
    unenrollmentDevice: PropTypes.object,
    deleteDevice: PropTypes.object
}

export default DangerZone