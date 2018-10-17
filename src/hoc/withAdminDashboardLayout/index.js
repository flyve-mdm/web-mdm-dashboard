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
  PureComponent,
} from 'react'
import PropTypes from 'prop-types'
import getMode from 'shared/getMode'
import configureDisplay from 'shared/configureDisplay'
import setGlpiCookie from 'shared/setGlpiCookie'
import animationsWinJs from 'shared/animationsWinJs/index'
import glpi from 'shared/glpiApi'
import I18n from 'shared/i18n'
import logout from 'shared/logout'
import SplitView from 'components/SplitView'
import HeaderBreadcrumb from 'components/HeaderBreadcrumb'
import Confirmation from 'components/Confirmation'
import withAuthentication from '../withAuthentication'
import withHandleMessages from '../withHandleMessages'

/** timeout to contract the lateral menu */
const TIMEOUT_CONTRACT = 150

/**
 * Wrapper component with the basic structure of the admin dashboard layout
 * @param {component} WrappedComponent Component to wrap
 * @return {component} The component with the admin dashboard layout
 */
const withAdminDashboardLayout = (WrappedComponent) => {
  class AdminDashboardLayout extends PureComponent {
    /**
     * Create AdminDashboardLayout
     * @param {object} props
     */
    constructor(props) {
      super(props)
      this.state = {
        expanded: false,
        contract: false,
        mode: getMode(),
        iframe: undefined,
      }

      window.addEventListener('resize', this.handleResize)
      configureDisplay()
      animationsWinJs()
    }

    /** Configure 'baseURL' and the cookies of glpi */
    componentDidMount = async () => {
      const {
        cfg_glpi: cfgGlpi,
      } = await glpi.getGlpiConfig()
      if (cfgGlpi) {
        localStorage.setItem('baseURL', cfgGlpi.url_base)
        this.setState({
          iframe: <iframe
            title="glpi-backend"
            src={`//${cfgGlpi.url_base.split('//')[1]}`}
            style={{
              height: 0, width: 0, opacity: 0, position: 'absolute',
            }}
          />,
        },
        () => setGlpiCookie(
          this.setState({
            iframe: undefined,
          }),
        ))
      }
    }

    /** Remove 'resize' event listener */
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    /** Close current session */
    logout = async () => {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        logout()
      }
    }

    /** Change 'mode' according to the resolution of the screen */
    handleResize = () => {
      const prevMode = this.state.mode
      const nextMode = getMode()

      if (prevMode !== nextMode) {
        this.setState({
          mode: nextMode,
        })
      }
    }

    /** Expand and collapse the side menu */
    handleToggleExpand = () => {
      this.state.expanded === false ? this.handleExpand() : this.handleContract()
    }

    /** Expand side menu */
    handleExpand = () => {
      this.setState({
        expanded: true,
        contract: false,
      })
    }

    /** Collapse the side menu */
    handleContract = () => {
      this.setState({
        contract: true,
      }, () => {
        this.handleSetTimeOut()
      })
    }

    /** Collapse the side menu after of the timeout */
    handleSetTimeOut = () => {
      if (this.state.contract) {
        setTimeout(() => {
          this.setState({
            expanded: false,
            contract: false,
          })
        }, TIMEOUT_CONTRACT)
      }
    }

    /**
     * Render component
     * @function render
     */
    render() {
      return (
        <main>
          <HeaderBreadcrumb
            handleToggleExpand={this.handleToggleExpand}
            location={this.props.history.location}
            languageCurrent={this.props.languageCurrent}
          />

          {(this.state.iframe || '')}

          <div className="flex-block">
            <SplitView
              expanded={this.state.expanded}
              contract={this.state.contract}
              handleExpand={this.handleExpand}
              handleContract={this.handleContract}
              handleSetTimeOut={this.handleSetTimeOut}
              handleToggleExpand={this.handleToggleExpand}
              mode={this.state.mode}
              logout={this.logout}
            />
            <WrappedComponent {...this.props} mode={this.state.mode} />
            <Confirmation
              title={I18n.t('logout.close_session')}
              message={I18n.t('settings.security.close_session_message')}
              reference={(el) => { this.contentDialog = el }}
            />
          </div>
        </main>
      )
    }
  }

  AdminDashboardLayout.propTypes = {
    toast: PropTypes.shape({
      setNotification: PropTypes.func,
    }).isRequired,
    handleMessage: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      logout: PropTypes.func,
    }).isRequired,
    history: PropTypes.object.isRequired,
    languageCurrent: PropTypes.string.isRequired,
  }

  return withAuthentication(withHandleMessages(AdminDashboardLayout))
}


export default withAdminDashboardLayout
