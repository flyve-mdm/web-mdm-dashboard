/*
 *   Copyright © 2018 Teclib. All rights reserved.
 *
 *   This file is part of web-mdm-dashboard
 *
 * web-mdm-dashboard is a subproject of Flyve MDM. Flyve MDM is a mobile
 * device management software.
 *
 * Flyve MDM is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * Flyve MDM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * ------------------------------------------------------------------------------
 * @author     Gianfranco Manganiello (gmanganiello@teclib.com)
 * @author     Hector Rondon (hrondon@teclib.com)
 * @copyright  Copyright © 2018 Teclib. All rights reserved.
 * @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link       https://github.com/flyve-mdm/web-mdm-dashboard
 * @link       http://flyve.org/web-mdm-dashboard
 * @link       https://flyve-mdm.com
 * ------------------------------------------------------------------------------
 */

/** import dependencies */
import React, {
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../shared/i18n'
import Confirmation from '../../../../components/Confirmation'
import itemtype from '../../../../shared/itemtype'
import publicURL from '../../../../shared/publicURL'
import ContentPane from '../../../../components/ContentPane'

/**
 * @class DangerZone
 * @extends PureComponent
 */
class DangerZone extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const {
      id,
      update,
    } = this.props

    this.state = {
      id,
      update,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      id,
      update,
    } = this.state

    if (prevState.id !== id || prevState.update !== update) {
      this.pane.forceAnimation()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
      return {
        ...prevState,
        id: nextProps.id,
        update: nextProps.update,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle device wipe
   * @async
   * @function wipe
   */
  wipe = async () => {
    const {
      wipeDevice,
      glpi,
      toast,
      changeAction,
      history,
      handleMessage,
    } = this.props
    const { id } = this.state

    const isOK = await Confirmation.isOK(wipeDevice)
    if (isOK) {
      try {
        const response = await glpi.updateItem({
          id,
          itemtype: itemtype.PluginFlyvemdmAgent,
          input: {
            wipe: '1',
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message ? response[0].message : I18n.t('notifications.data_deleted_successfully'),
          type: 'success',
        })
        changeAction('reload')
        history.push(`${publicURL}/app/devices`)
      } catch (error) {
        this.props.toast.setNotification(handleMessage({
          type: 'alert',
          message: error,
        }))
      }
    }
  }

  /**
   * handle device unenroll
   * @async
   * @function unenroll
   */
  unenroll = async () => {
    const {
      unenrollmentDevice,
      glpi,
      toast,
      changeAction,
      history,
      handleMessage,
    } = this.props
    const { id } = this.state

    const isOK = await Confirmation.isOK(unenrollmentDevice)
    if (isOK) {
      try {
        const response = await glpi.updateItem({
          id,
          itemtype: itemtype.PluginFlyvemdmAgent,
          input: {
            _unenroll: '1',
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message ? response[0].message : I18n.t('notifications.unenrollment_device'),
          type: 'success',
        })
        changeAction('reload')
        history.push(`${publicURL}/app/devices`)
      } catch (error) {
        this.props.toast.setNotification(handleMessage({
          type: 'alert',
          message: error,
        }))
      }
    }
  }

  /**
   * handle device delete
   * @async
   * @function delete
   */
  delete = async () => {
    const {
      deleteDevice,
      glpi,
      toast,
      changeAction,
      history,
      handleMessage,
    } = this.props
    const { id } = this.state

    const isOK = await Confirmation.isOK(deleteDevice)
    if (isOK) {
      try {
        const response = await glpi.deleteItem({
          id,
          itemtype: itemtype.PluginFlyvemdmAgent,
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message ? response[0].message : I18n.t('notifications.devices_successfully_deleted'),
          type: 'success',
        })
        changeAction('reload')
        history.push(`${publicURL}/app/devices`)
      } catch (error) {
        this.props.toast.setNotification(handleMessage({
          type: 'alert',
          message: error,
        }))
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <ContentPane ref={(pane) => { this.pane = pane }}>
          <div className="list-element">
            <div className="list-element__message">
              {I18n.t('devices.danger_zone.wipe')}
              <div className="list-element__detail">
                {I18n.t('devices.danger_zone.wipe_description')}
              </div>
            </div>
            <div className="list-element__controller">
              <button
                className="btn btn--secondary"
                onClick={this.wipe}
                type="button"
              >
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
              <button
                className="btn btn--secondary"
                onClick={this.unenroll}
                type="button"
              >
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
              <button
                className="btn btn--secondary"
                onClick={this.delete}
                type="button"
              >
                {I18n.t('commons.delete')}
              </button>
            </div>
          </div>
        </ContentPane>
      </React.Fragment>
    )
  }
}

DangerZone.defaultProps = {
  wipeDevice: null,
  unenrollmentDevice: null,
  deleteDevice: null,
}

/** DangerZone propTypes */
DangerZone.propTypes = {
  id: PropTypes.string.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeAction: PropTypes.func.isRequired,
  update: PropTypes.bool.isRequired,
  wipeDevice: PropTypes.object,
  unenrollmentDevice: PropTypes.object,
  deleteDevice: PropTypes.object,
}

export default DangerZone
