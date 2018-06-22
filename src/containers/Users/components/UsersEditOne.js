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
  I18n,
} from 'react-i18nify'
import ConstructInputs from '../../../components/Forms'
import ContentPane from '../../../components/ContentPane'
import validateData from '../../../shared/validateData'
import IconItemList from '../../../components/IconItemList'
import {
  usersScheme,
} from '../../../components/Forms/Schemas'
import Loading from '../../../components/Loading'
import ErrorValidation from '../../../components/ErrorValidation'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'

/**
 * Component with the user edit form
 * @class UsersEditOne
 * @extends PureComponent
 */
class UsersEditOne extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    const {
      history,
    } = this.props

    this.state = {
      isLoading: true,
      id: getID(history.location.pathname),
      firstName: undefined,
      realName: undefined,
      phone: undefined,
      mobilePhone: undefined,
      phone2: undefined,
      administrativeNumber: undefined,
      emails: undefined,
      imageProfile: undefined,
      password: undefined,
      passwordConfirmation: undefined,
      category: undefined,
      defaultEntity: undefined,
      comments: undefined,
      typeImageProfile: undefined,
      title: undefined,
      location: undefined,
      defaultProfile: undefined,
      validSince: undefined,
      validUntil: undefined,
    }
  }

  /**
   * Make the call to update the content
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * Update the content
   * @function handleRefresh
   */
  handleRefresh = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { glpi } = this.props
      const { id } = this.state

      try {
        const response = await glpi.getAnItem({
          itemtype: itemtype.User,
          id,
        })
        const myEmails = await glpi.getSubItems({
          itemtype: itemtype.User,
          id,
          subItemtype: 'UserEmail',
        })
        const { cfg_glpi: cfgGlpi } = await glpi.getGlpiConfig()

        const parametersToEvaluate = {
          minimunLength: cfgGlpi.password_min_length,
          needDigit: cfgGlpi.password_need_number,
          needLowercaseCharacter: cfgGlpi.password_need_letter,
          needUppercaseCharacter: cfgGlpi.password_need_caps,
          needSymbol: cfgGlpi.password_need_symbol,
        }
        this.setState({
          isLoading: false,
          parametersToEvaluate,
          firstName: validateData(response.firstname),
          realName: validateData(response.realname),
          phone: validateData(response.phone),
          mobilePhone: validateData(response.mobile),
          phone2: validateData(response.phone2),
          administrativeNumber: validateData(response.registration_number),
          currentEmails: myEmails.map(a => ({ ...a })),
          emails: validateData(myEmails, []),
          imageProfile: validateData(response.picture, 'profile.png'),
          password: '',
          passwordConfirmation: '',
          category: {
            value: validateData(response.usercategories_id),
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
            value: validateData(response.entities_id),
            request: {
              params: {},
              method: 'getMyEntities',
              content: 'name',
              value: 'id',
            },
          },
          comments: '',
          typeImageProfile: 'file',
          title: {
            value: validateData(response.usertitles_id),
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
            value: validateData(response.locations_id),
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
            value: validateData(response.profiles_id),
            request: {
              params: {},
              method: 'getMyProfiles',
              content: 'name',
              value: 'id',
            },
          },
          validSince: response.begin_date ? new Date(response.begin_date) : undefined,
          validUntil: response.end_date ? new Date(response.end_date) : undefined,
        })
      } catch (error) {
        this.setState({ isLoading: false })
      }
    })
  }

  /**
   * Validate data and save the new information in glpi
   * @function saveChanges
   */
  saveChanges = () => {
    const {
      id,
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
      parametersToEvaluate,
      password,
    } = this.state

    let newUser = {
      id,
      phone,
      phone2,
      firstname: firstName,
      realname: realName,
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
          message: 'Passwords do not match',
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
        const {
          glpi,
          changeAction,
          setNotification,
          handleMessage,
        } = this.props
        const {
          currentEmails,
          emails,
        } = this.state

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
          setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.saved_profile'),
            type: 'success',
          })
          changeAction('reload')
        } catch (error) {
          setNotification(handleMessage({
            type: 'alert',
            message: error,
          }))
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
    const { emails } = this.state

    const emailsCopy = [...emails]
    emailsCopy[index].email = value
    this.setState({
      emails: emailsCopy,
    })
  }

  /**
   * Handle set state
   * @function changeSelect
   * @param {string} name
   * @param {string} value
   */
  changeSelect = (name, value) => {
    const { [name]: current } = this.state
    this.setState({
      [name]: {
        ...current,
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
   * @param {component} evt
   */
  previewFile = (evt) => {
    const file = evt.target.files[0]
    if (file.type.match('image.*')) {
      const reader = new FileReader()

      reader.onload = (() => (e) => {
        this.setState({
          imageProfile: e.target.result,
          typeImageProfile: 'file',
        })
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
      isLoading,
      imageProfile,
      typeImageProfile,
    } = this.state
    const { glpi } = this.props

    let componetRender

    if (isLoading) {
      componetRender = <Loading message={`${I18n.t('commons.loading')}...`} />
    } else {
      const user = usersScheme({
        state: this.state,
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

      componetRender = (
        <div className="froms Profiles">
          <div className="froms__row froms__row--icon">
            <span className="viewIcon" />
          </div>

          <div className="froms__row">
            <div style={{ overflow: 'hidden', paddingLeft: '20px' }}>
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

          <div style={{ overflow: 'auto', paddingRight: '20px' }}>
            <button
              className="win-button"
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
      )
    }

    return (
      <ContentPane>
        {componetRender}
      </ContentPane>
    )
  }
}

UsersEditOne.propTypes = {
  history: PropTypes.object.isRequired,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default UsersEditOne
