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
import publicURL from 'shared/publicURL'
import glpi from 'shared/glpiApi'

const AuthenticationContext = React.createContext()

export const AuthenticationConsumer = AuthenticationContext.Consumer

export class AuthenticationProvider extends PureComponent {
  state = {
    configurationPassword: {},
    captcha: {},
    isLoading: false,
    sessionToken: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : undefined,
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined,
    setCurrentUser: (currentUser, sessionToken) => {
      this.setState({ currentUser, sessionToken }, () => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem('sessionToken', sessionToken)
        this.props.children.props.history.push(`${publicURL}/app`)
      })
    },
    fetchSignIn: (username, password) => new Promise((resolve, reject) => {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          glpi.login({
            userName: username,
            userPassword: password,
          }).then((response) => {
            const user = {
              id: response.userData.id,
              name: response.userData.name,
              email: response.userEmails.length > 0 ? response.userEmails[0].email : '',
              picture: null,
            }

            localStorage.setItem('sessionToken', response.sessionToken)
            localStorage.setItem('currentUser', JSON.stringify(user))

            this.setState(
              {
                isLoading: false,
                sessionToken: response.sessionToken,
                currentUser: user,
              },
              () => {
                resolve()
              },
            )
          }).catch((error) => {
            this.setState(
              {
                isLoading: false,
              },
              () => {
                reject(error)
              },
            )
          })
        },
      )
    }),
    fetchResetPassword: ({ email, token, newPassword }) => new Promise((resolve, reject) => {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          glpi.genericRequest({
            path: 'lostPassword',
            requestParams: {
              method: 'PUT',
              body: JSON.stringify({
                email,
                password_forget_token: token,
                password: newPassword,
              }),
            },
          })
            .then((response) => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  resolve({
                    title: window.appConfig.appName,
                    body: response[0],
                    type: 'success',
                  })
                },
              )
            })
            .catch((error) => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  reject(error)
                },
              )
            })
        },
      )
    }),
  }

  render() {
    const context = { ...this.state }
    return (
      <AuthenticationContext.Provider value={{ auth: context }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    )
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
