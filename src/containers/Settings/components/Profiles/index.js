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
import {
  connect,
} from 'react-redux'
import {
  bindActionCreators,
} from 'redux'
import {
  I18n,
} from 'react-i18nify'
import validateData from '../../../../shared/validateData'
import IconItemList from '../../../../components/IconItemList'
import {
  usersScheme,
} from '../../../../components/Forms/Schemas'
import Loading from '../../../../components/Loading'
import authtype from '../../../../shared/authtype'
import ErrorValidation from '../../../../components/ErrorValidation'
import ConstructInputs from '../../../../components/Forms'
import withGLPI from '../../../../hoc/withGLPI'
import withHandleMessages from '../../../../hoc/withHandleMessages'
import {
  uiSetNotification,
} from '../../../../store/ui/actions'
import ContentPane from '../../../../components/ContentPane'
import itemtype from '../../../../shared/itemtype'

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    setNotification: bindActionCreators(uiSetNotification, dispatch),
  }
  return {
    actions,
  }
}

/**
 * Component with the profiles section
 * @class Profiles
 * @extends PureComponent
 */
class Profiles extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      login: null,
      isLoading: true,
    }
  }

  /**
   * Get the user information from glpi
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    const { login } = this.state
    const {
      glpi,
      currentUser,
    } = this.props

    if (login === null) {
      const myUser = await glpi.getAnItem({
        itemtype: itemtype.User,
        id: currentUser.id,
      })

      const myEmails = await glpi.getSubItems({
        itemtype: itemtype.User,
        id: currentUser.id,
        subItemtype: 'UserEmail',
      })

      const {
        cfg_glpi: cfgGlpi,
      } = await glpi.getGlpiConfig()

      const parametersToEvaluate = {
        minimunLength: cfgGlpi.password_min_length,
        needDigit: cfgGlpi.password_need_number,
        needLowercaseCharacter: cfgGlpi.password_need_letter,
        needUppercaseCharacter: cfgGlpi.password_need_caps,
        needSymbol: cfgGlpi.password_need_symbol,
      }

      this.setState({
        parametersToEvaluate,
        login: myUser.name,
        firstName: myUser.firstname,
        realName: myUser.realname,
        phone: myUser.phone,
        mobilePhone: myUser.mobile,
        phone2: myUser.phone2,
        administrativeNumber: myUser.registration_number,
        lastLogin: myUser.last_login,
        created: myUser.date_creation,
        modified: myUser.date_mod,
        currentEmails: myEmails.map(a => ({ ...a })),
        emails: validateData(myEmails, []),
        imageProfile: validateData(myUser.picture, 'profile.png'),
        authentication: authtype(myUser.authtype),
        password: '',
        passwordConfirmation: '',
        category: {
          value: myUser.usercategories_id,
          request: {
            params: {
              itemtype: itemtype.UserCategory,
              options: {
                range: '0-200',
                forcedisplay: [2],
              },
            },
            method: 'searchItems',
            content: '1',
            value: '2',
          },
        },
        defaultEntity: {
          value: myUser.entities_id,
          request: {
            params: {},
            method: 'getMyEntities',
            content: 'name',
            value: 'id',
          },
        },
        comments: validateData(myUser.comment, ''),
        typeImageProfile: 'file',
        title: {
          value: myUser.usertitles_id,
          request: {
            params: {
              itemtype: itemtype.UserTitle,
              options: {
                range: '0-200',
                forcedisplay: [2],
              },
            },
            method: 'searchItems',
            content: '1',
            value: '2',
          },
        },
        location: {
          value: myUser.locations_id,
          request: {
            params: {
              itemtype: itemtype.Location,
              options: {
                range: '0-200',
                forcedisplay: [2],
              },
            },
            method: 'searchItems',
            content: '1',
            value: '2',
          },
        },
        defaultProfile: {
          value: myUser.profiles_id,
          request: {
            params: {},
            method: 'getMyProfiles',
            content: 'name',
            value: 'id',
          },
        },
        validSince: myUser.begin_date ? new Date(myUser.begin_date) : undefined,
        validUntil: myUser.end_date ? new Date(myUser.end_date) : undefined,
      }, () => {
        this.setState({
          isLoading: false,
        })
      })
    }
  }

  /**
   * Save the new values in glpi
   * @function saveChanges
   */
  saveChanges = () => {
    const {
      currentUser,
      actions,
      glpi,
    } = this.props
    const {
      firstName,
      realName,
      phone,
      mobilePhone,
      phone2,
      administrativeNumber,
      imageProfile,
      category,
      defaultEntity,
      comments,
      title,
      location,
      defaultProfile,
      validSince,
      validUntil,
      passwordConfirmation,
      password,
      parametersToEvaluate,
      currentEmails,
      emails,
    } = this.state

    let newUser = {
      id: currentUser.id,
      firstname: firstName,
      realname: realName,
      phone,
      phone2,
      mobile: mobilePhone,
      registration_number: administrativeNumber,
      picture: imageProfile,
      usercategories_id: category.value,
      entities_id: defaultEntity.value,
      comment: comments,
      usertitles_id: title.value,
      locations_id: location.value,
      profiles_id: defaultProfile.value,
      begin_date: validSince,
      end_date: validUntil,
    }

    let correctPassword = true

    if (password !== '' || passwordConfirmation !== '') {
      if (!ErrorValidation.validation(parametersToEvaluate, password).isCorrect) {
        correctPassword = false
      } else if (!ErrorValidation.validation({
        ...parametersToEvaluate,
        isEqualTo: {
          value: password,
          message: I18n.t('commons.passwords_not_match'),
        },
      }, passwordConfirmation).isCorrect) {
        correctPassword = false
      } else {
        newUser = {
          ...newUser,
          password,
          password2: passwordConfirmation,
        }
      }
    }

    if (correctPassword) {
      this.setState({
        isLoading: true,
      },
      async () => {
        try {
          await glpi.updateItem({
            itemtype: itemtype.User,
            input: newUser,
          })
          await glpi.updateEmails({
            userID: newUser.id,
            currentEmails,
            newEmails: emails,
          })
          this.setState({
            isLoading: false,
          })
          actions.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.profile_data_changed'),
            type: 'success',
          })
        } catch (e) {
          this.setState({
            isLoading: false,
          })
        }
      })
    }
  }

  /**
   * Handle set state
   * @function changeState
   * @param {string} name
   * @param {string} value
   */
  changeState = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  /**
   * Handle set of the emails
   * @function changeEmail
   * @param {number} index
   * @param {string} value
   */
  changeEmail = (index, value) => {
    const { emails: currentEmails } = this.state
    const emails = [...currentEmails]
    emails[index].email = value
    this.setState({
      emails,
    })
  }

  /**
   * Handle set state
   * @function changeSelect
   * @param {string} name
   * @param {string} value
   */
  changeSelect = (name, value) => {
    const { [name]: currentValue } = this.state
    this.setState({
      [name]: {
        ...currentValue,
        value,
      },
    })
  }

  /**
   * Delete an email
   * @function deleteEmail
   * @param {number} index
   */
  deleteEmail = (index) => {
    const { emails } = this.state

    this.setState({
      emails: emails.slice(0, index).concat(emails.slice(index + 1)),
    })
  }

  /**
   * Add an email
   * @function addEmail
   */
  addEmail = () => {
    const { emails } = this.state

    this.setState({
      emails: [
        ...emails,
        {
          email: '',
        },
      ],
    })
  }

  /**
   * Preview of the profile image
   * @function previewFile
   * @param {object} evt
   */
  previewFile = (evt) => {
    const file = evt.target.files[0]
    if (file.type.match('image.*')) {
      const reader = new FileReader()

      reader.onload = (() => (e) => {
        this.setState({
          imageProfile: e.target.result,
          typeImageProfile: 'file',
        });
      })(file)

      reader.readAsDataURL(file)
    }
  }

  /**
   * Handle set of the profile image
   * @function openFileChooser
   */
  openFileChooser = () => {
    this.inputElement.value = null
    this.inputElement.click()
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      glpi,
    } = this.props
    const {
      login,
      isLoading,
      imageProfile,
      typeImageProfile,
      realName,
      firstName,
      title,
      location,
      phone,
      phone2,
      validSince,
      administrativeNumber,
      passwordConfirmation,
      created,
      mobilePhone,
      password,
      lastLogin,
      comments,
      modified,
      validUntil,
      parametersToEvaluate,
      authentication,
      defaultEntity,
      defaultProfile,
      category,
      emails,
    } = this.state

    let component = null

    if (isLoading || !login) {
      component = (
        <div
          style={{
            width: '100%',
            height: 'calc(100vh - 120px)',
          }}
        >
          <Loading message={`${I18n.t('commons.loading')}...`} />
        </div>
      )
    } else {
      const user = usersScheme({
        realName,
        firstName,
        title,
        location,
        login,
        phone,
        phone2,
        validSince,
        administrativeNumber,
        passwordConfirmation,
        created,
        mobilePhone,
        password,
        lastLogin,
        comments,
        modified,
        validUntil,
        parametersToEvaluate,
        authentication,
        defaultEntity,
        defaultProfile,
        category,
        emails,
        changeState: this.changeState,
        changeEmail: this.changeEmail,
        deleteEmail: this.deleteEmail,
        changeSelect: this.changeSelect,
        glpi,
      })

      const inputAttributes = {
        type: 'file',
        accept: 'image/*',
        name: 'imageProfile',
        style: {
          display: 'none',
        },
        ref: (element) => {
          this.inputElement = element
        },
        onChange: this.previewFile,
      }

      component = (
        <React.Fragment>
          <h2 style={{ margin: '10px' }}>
            {I18n.t('commons.profiles')}
          </h2>
          <div className="froms Profiles" style={{ marginTop: '20px' }}>
            <div className="froms__row froms__row--icon">
              <span className="viewIcon" />
            </div>
            <div className="froms__row">
              <div style={{ overflow: 'hidden' }}>
                <input
                  {...inputAttributes}
                />
                <IconItemList
                  image={imageProfile}
                  type={typeImageProfile}
                  imgClick={this.openFileChooser}
                  size={150}
                  imgClass="clickable"
                />
              </div>
            </div>

            <ConstructInputs data={user.personalInformation} icon="contactIcon" />
            <ConstructInputs data={user.passwordInformation} icon="permissionsIcon" />
            <ConstructInputs data={user.validDatesInformation} icon="monthIcon" />
            <ConstructInputs data={user.emailsInformation} icon="emailIcon" />
            <div style={{ overflow: 'auto' }}>
              <button
                className="btn btn--secondary"
                style={{ float: 'right' }}
                onClick={this.addEmail}
                type="button"
              >
                {I18n.t('commons.add_email')}
              </button>
            </div>
            <ConstructInputs data={user.contactInformation} icon="phoneIcon" />
            <ConstructInputs data={user.moreInformation} icon="detailsIcon" />
            <ConstructInputs data={user.activityInformation} icon="documentIcon" />
            <button
              className="btn btn--primary"
              style={{ margin: '20px', float: 'right' }}
              onClick={this.saveChanges}
              type="button"
            >
              {I18n.t('commons.save')}
            </button>

            <br />
          </div>
        </React.Fragment>
      )
    }
    return (
      <ContentPane>
        { component }
      </ContentPane>
    )
  }
}

Profiles.propTypes = {
  currentUser: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withGLPI(withHandleMessages(Profiles)))
