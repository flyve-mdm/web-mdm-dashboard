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
import ReactWinJS from 'react-winjs'
import I18n from '../../../../shared/i18n'
import ContentPane from '../../../../components/ContentPane'

/**
 * Component with the notifications section
 * @class Notifications
 * @extends PureComponent
 */
class Notifications extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    const notificationType = (localStorage.getItem('notificationType') && Notification.permission === 'granted')
      ? localStorage.getItem('notificationType')
      : 'Toast'

    const showNotifications = localStorage.getItem('showNotifications')
      ? (localStorage.getItem('showNotifications') === 'true')
      : true

    this.state = {
      notificationType,
      showNotifications,
    }
  }

  /**
   * Change notification type
   * @function changeNotificationType
   * @param {object} e
   */
  changeNotificationType = (e) => {
    const newNotificationType = e.target.value
    if (Notification) {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          localStorage.setItem('notificationType', newNotificationType)
          this.setState({
            notificationType: newNotificationType,
          })
        }
      })
    }
  }

  /**
   * Change show notifications
   * @function changeShowNotifications
   */
  changeShowNotifications = () => {
    localStorage.setItem('showNotifications', !this.state.showNotifications)
    this.setState((prevState) => {
      ({
        showNotifications: !prevState.showNotifications,
      })
    })
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <ContentPane>
        <h2 style={{ margin: '10px' }}>
          {I18n.t('settings.notifications.title')}
        </h2>
        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.notifications.show')}
            <div className="list-element__detail">
              {I18n.t('settings.notifications.show_deatil')}
            </div>
          </div>
          <div className="list-element__controller">
            <ReactWinJS.ToggleSwitch
              className="files-list__content-text-primary"
              checked={this.state.showNotifications}
              onChange={this.changeShowNotifications}
            />
          </div>
        </div>

        <div className="list-element">
          <div className="list-element__message">
            {I18n.t('settings.notifications.type')}
            <div className="list-element__detail">
              {I18n.t('settings.notifications.type_detail')}
            </div>
          </div>
          <div className="list-element__controller" style={{ paddingTop: 10 }}>
            <select
              name="notificationType"
              value={this.state.notificationType}
              onChange={this.changeNotificationType}
            >
              <option>
                {I18n.t('settings.notifications.toast')}
              </option>
              <option>
                {I18n.t('settings.notifications.native')}
              </option>
            </select>
          </div>
        </div>
      </ContentPane>
    )
  }
}

export default Notifications
