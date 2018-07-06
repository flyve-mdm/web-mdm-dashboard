import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import publicURL from '../../shared/publicURL'
import glpi from '../../shared/glpiApi'
import itemtype from '../../shared/itemtype'
import appConfig from '../../../public/config.json'

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
    logout: () => {
      try {
        this.setState(
          {
            currentUser: undefined,
            sessionToken: undefined,
          },
          async () => {
            localStorage.removeItem('currentUser')
            localStorage.removeItem('sessionToken')
            await glpi.killSession()
            this.props.children.props.history.push(`${publicURL}/`)
          },
        )
      } catch (error) {
        this.setState({
          currentUser: undefined,
          sessionToken: undefined,
        }, () => {
          this.props.children.props.history.push(`${publicURL}/`)
        })
      }
    },
    fetchSignIn: (username, password) => {
      return new Promise((resolve, reject) => {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            glpi.login({
              userName: username,
              userPassword: password
            }).then(response => {
              const user = {
                id: response.userData.id,
                name: response.userData.name,
                email: response.userEmails.length > 0 ? response.userEmails[0].email : '',
                picture: null
              }

              localStorage.setItem('sessionToken', response.sessionToken)
              localStorage.setItem('currentUser', JSON.stringify(user))

              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  resolve()
                }
              )
            }).catch(error => {

              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  reject(error)
                }
              )
            })
          },
        )
      })
    },
    fetchCaptcha: () => {
      return new Promise((resolve, reject) => {
        this.setState(
          {
            isLoading: true,
          },
          async () => {
            try {
              const session = await glpi.initSessionByUserToken({
                userToken: appConfig.demoToken
              })
              glpi.sessionToken = session.session_token
              const {
                id
              } = await glpi.addItem({
                itemtype: itemtype.PluginFlyvemdmdemoCaptcha,
                input: {}
              })
              const captcha = await glpi.genericRequest({
                path: `PluginFlyvemdmdemoCaptcha/${id}`,
                queryString: {
                  alt: 'media'
                },
                requestParams: {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/octet-stream'
                  },
                  responseType: 'blob'
                }
              })
              const {
                cfg_glpi
              } = await glpi.getGlpiConfig()
              const configurationPassword = {
                minimunLength: cfg_glpi.password_min_length,
                needDigit: cfg_glpi.password_need_number,
                needLowercaseCharacter: cfg_glpi.password_need_letter,
                needUppercaseCharacter: cfg_glpi.password_need_caps,
                needSymbol: cfg_glpi.password_need_symbol
              }

              this.setState(
                {
                  isLoading: false,
                  configurationPassword,
                  captcha: {
                    id: id,
                    img: URL.createObjectURL(captcha),
                  }
                },
                () => {
                  resolve()
                }
              )

            } catch (error) {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  reject(error)
                }
              )
            }
          }
        )}
      )
    },
    fetchSignUp: (data) => {
      return new Promise((resolve, reject) => {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            glpi.registerUser({
              userToken: appConfig.demoToken,
              userData: data,
              itemtype: itemtype.PluginFlyvemdmdemoUser
            })
              .then(() => {
                this.setState(
                  {
                    isLoading: false,
                  },
                  () => {
                    resolve()
                })
              })
              .catch((error) => {
                this.setState(
                  {
                    isLoading: false,
                  },
                  () => {
                    reject(error)
                  })
              })
          }
        )
      })
    },
    fetchResetPassword: ({email, token, newPassword}) => {
      return new Promise((resolve, reject) => {
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
                  "email": email,
                  "password_forget_token": token,
                  "password": newPassword
                })
              }
            })
            .then((response) => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  resolve({
                    title: appConfig.appName,
                    body: response[0],
                    type: 'success'
                  })
              })
            })
            .catch((error) => {
              this.setState(
                {
                  isLoading: false,
                },
                () => {
                  reject(error)
                })
            })
          }
        )
      })
    },
  }

  render() {
    const context = { ...this.state }
    return (
      <AuthenticationContext.Provider value={{ auth: context }}>
        {this.props.children}
      </AuthenticationContext.Provider>
    );
  }
}

AuthenticationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
}
