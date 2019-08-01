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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import WinJS from 'winjs'
import validateNotifications from 'shared/validateNotifications'
import nativeNotification from 'shared/nativeNotification'

const NotificationsContext = React.createContext()

export const NotificationsConsumer = NotificationsContext.Consumer

export class NotificationsProvider extends PureComponent {
  state = {
    notification: {
      title: '',
      body: '',
      type: 'info',
    },
    show: false,
    setNotification: (notification = {}) => {
      let getNotification = notification
      if (typeof getNotification !== 'object') {
        getNotification = {}
      }
      this.setState(
        {
          show: true,
          notification: getNotification,
        },
        () => {
          const { type } = validateNotifications()
          if (type === 'Native') {
            nativeNotification(
              getNotification.title,
              getNotification.body,
            )
          }
          setTimeout(() => {
            this.state.hidenNotification()
          }, 4000)
        },
      )
    },
    hidenNotification: () => {
      WinJS.UI.Animation.exitContent(
        document.getElementsByClassName('toast'), {
          top: '0px',
          left: '20px',
        },
      ).then(() => {
        this.setState(
          {
            show: false,
            notification: {
              title: '',
              body: '',
              type: 'info',
            },
          },
          () => { },
        )
      })
    },
  }

  render() {
    const context = { ...this.state }
    const notification = validateNotifications()
    let toast = null
    if (context.show && notification.type === 'Toast') {
      toast = (
        <div className={`toast toast--${context.notification.type}`}>
          <span
            className="iconFont cancelIcon"
            style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }}
            onClick={() => {
              context.hidenNotification()
            }}
            role="button"
            tabIndex="0"
          />
          <div className="toast__title">
            {context.notification.title}
          </div>
          <div className="toast__body">
            {context.notification.body}
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        {toast}
        <NotificationsContext.Provider value={{ toast: context }}>
          {this.props.children}
        </NotificationsContext.Provider>
      </React.Fragment>
    )
  }
}

NotificationsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
