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

import React, {
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import {
  connect
} from 'react-redux'
import WinJS from 'winjs'
import {
  withRouter
} from 'react-router'
import {
  bindActionCreators
} from 'redux'
import {
  uiHideNotification
} from '../../store/ui/actions'
import validateNotifications from '../../shared/validateNotifications'
import nativeNotification from '../../shared/nativeNotification'

function mapStateToProps(state, props) {
  return {
    body: state.ui.notification.body,
    title: state.ui.notification.title,
    type: state.ui.notification.type,
    show: state.ui.notification.show
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    uiHideNotification: bindActionCreators(uiHideNotification, dispatch)
  }
  return {
    actions
  }
}

/**
 * Wrapper component to add notifications (Toast and Native)
 * @param {component} WrappedComponent Component to wrap
 * @return {component} The component with the notifications
 */
const withNotification = WrappedComponent => {
  class ToastNotification extends PureComponent {
    /**
     * Create ToastNotification
     * @param {object} props
     */
    constructor(props) {
      super(props)
      this.state = {
        timer: {},
        show: false,
        title: this.props.title,
        body: this.props.body
      }
    }

    /**
     * Make sure that the state and props are in sync for when it is required
     * @param {object} nextProps
     * @param {object} prevState
     */
    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.title !== prevState.title || nextProps.body !== prevState.body) {
        return {
          show: true,
          type: nextProps.type,
          title: nextProps.title,
          body: nextProps.body,
        }
      }
      return null
    }

    /**
     * Display the notifications if it's necessary
     * @param {object} prevProps
     */
    componentDidUpdate(prevProps) {
      if (prevProps.title !== this.props.title || prevProps.body !== this.props.body) {
        const notification = validateNotifications()
        if ((notification.show || this.state.type === "alert") && this.state.show) {
          if (notification.type === "Native") {
            nativeNotification(this.state.title, this.state.body, this.state.icon)
          }
          this.setState({
            timer: setTimeout(() => {
              this.hideNotification()
            }, 4000)
          })
        }
      }
    }

    /** Hide 'Toast' notifications */
    hideNotification = () => {
      WinJS.UI.Animation.exitContent(
        document.getElementsByClassName('toast'), {
          top: '0px',
          left: '20px'
        }
      ).then(() => {
        this.setState({
          show: false,
          title: undefined,
          body: undefined
        }, () => {
          clearTimeout(this.state.timer)
          this.props.actions.uiHideNotification()
        })
      })
    }

    /**
     * Render component
     * @function render
     */
    render() {
      let toast = null
      const notification = validateNotifications()
      if (this.state.show && notification.type === 'Toast') {
        toast = (
          <div className={`toast toast--${this.props.type}`}>
            <span
              className="cancelIcon"
              style={{ float: 'right', cursor: 'pointer', color: '#ffffff' }}
              onClick={() => {
                this.hideNotification()
              }}
            />
            <div className="toast__title">
              {this.props.title}
            </div>
            <div className="toast__body">
              {this.props.body}
            </div>
          </div>
        )
      }
      return (
        <React.Fragment>
          {toast}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  ToastNotification.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    type: PropTypes.string,
    show: PropTypes.bool
  }

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ToastNotification)
  )
}

export default withNotification
