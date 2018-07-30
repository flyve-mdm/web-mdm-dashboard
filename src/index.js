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
import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
} from 'react-router-dom'
import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { loadTheme } from 'office-ui-fabric-react'
import history from './shared/history'
import RootApp from './applications/RootApp'
import {
  unregister,
} from './registerServiceWorker'
import { I18nProvider } from './providers/I18nProvider'
import { NotificationsProvider } from './providers/NotificationsProvider'
import { AuthenticationProvider } from './providers/AuthenticationProvider'
import './assets/styles/css/main.css' // Global CSS Styles
import 'web-animations-js/web-animations-next-lite.min'

initializeIcons()

loadTheme({
  palette: {
    themePrimary: '#158784',
    themeLighterAlt: '#f2fafa',
    themeLighter: '#cceceb',
    themeLight: '#a4dbd9',
    themeTertiary: '#5bb7b4',
    themeSecondary: '#279692',
    themeDarkAlt: '#137a76',
    themeDark: '#106764',
    themeDarker: '#0c4c4a',
    neutralLighterAlt: '#f3f3f3',
    neutralLighter: '#efefef',
    neutralLight: '#e5e5e5',
    neutralQuaternaryAlt: '#d6d6d6',
    neutralQuaternary: '#cccccc',
    neutralTertiaryAlt: '#c4c4c4',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#fafafa',
    bodyBackground: '#fafafa',
    bodyText: '#333',
  },
})

/**
 * Create the bugsnag client
 * and disable its 'beforeSend' function by being in a test or development environment
 * @constant bugsnagClient
 * @type {object}
 */
const bugsnagClient = bugsnag({
  apiKey: window.appConfig.bugsnag,
  beforeSend: () => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      return false
    }
    return true
  },
})
/**
 * Wrapper component with the errors monitor of bugsnag
 * @constant ErrorBoundary
 * @type {component}
 */
const ErrorBoundary = bugsnagClient.use(createPlugin(React))

/**
 * Mount the application in the DOM
 * and synchronize it with the routes, the redux provider and the bugsnag error monitor
 */
ReactDOM.render(
  (
    <ErrorBoundary>
      <I18nProvider>
        <NotificationsProvider>
          <AuthenticationProvider>
            <Router history={history}>
              <RootApp />
            </Router>
          </AuthenticationProvider>
        </NotificationsProvider>
      </I18nProvider>
    </ErrorBoundary>
  ),
  document.getElementById('root'),
)

/** Disable service worker */
unregister()
