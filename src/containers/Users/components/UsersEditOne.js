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
import I18n from '../../../shared/i18n'
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
import authtype from '../../../shared/authtype'

/**
 * Component with the user edit form
 * @class UsersEditOne
 * @extends PureComponent
 */
class UsersEditOne extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      id: getID(this.props.history.location.pathname),
      login: undefined,
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
      lastLogin: undefined,
      created: undefined,
      modified: undefined,
      authentication: undefined,
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
      try {
        const { id } = this.state
        const myUser = await this.props.glpi.getAnItem({
          itemtype: itemtype.User,
          id,
        })
        const myEmails = await this.props.glpi.getSubItems({
          itemtype: itemtype.User,
          id,
          subItemtype: 'UserEmail',
        })
        const { cfg_glpi: cfgGlpi } = await this.props.glpi.getGlpiConfig()
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
          login: myUser.name,
          firstName: validateData(myUser.firstname),
          realName: validateData(myUser.realname),
          phone: validateData(myUser.phone),
          mobilePhone: validateData(myUser.mobile),
          phone2: validateData(myUser.phone2),
          administrativeNumber: validateData(myUser.registration_number),
          currentEmails: myEmails.map(a => ({ ...a })),
          emails: validateData(myEmails, []),
          imageProfile: validateData(myUser.picture, 'profile.png'),
          comments: validateData(myUser.comment, ''),
          password: '',
          passwordConfirmation: '',
          lastLogin: myUser.last_login,
          created: myUser.date_creation,
          modified: myUser.date_mod,
          authentication: authtype(myUser.authtype),
          category: {
            value: validateData(myUser.usercategories_id),
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
            value: validateData(myUser.entities_id),
            request: {
              params: {},
              method: 'getMyEntities',
              content: 'name',
              value: 'id',
            },
          },
          typeImageProfile: 'file',
          title: {
            value: validateData(myUser.usertitles_id),
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
            value: validateData(myUser.locations_id),
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
            value: validateData(myUser.profiles_id),
            request: {
              params: {},
              method: 'getMyProfiles',
              content: 'name',
              value: 'id',
            },
          },
          validSince: myUser.begin_date ? new Date(myUser.begin_date) : undefined,
          validUntil: myUser.end_date ? new Date(myUser.end_date) : undefined,
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
    let newUser = {
      id: this.state.id,
      phone: this.state.phone,
      phone2: this.state.phone2,
      firstname: this.state.firstName,
      realname: this.state.realName,
      mobile: this.state.mobilePhone,
      registration_number: this.state.administrativeNumber,
      usercategories_id: this.state.category.value,
      entities_id: this.state.defaultEntity.value,
      comment: this.state.comments,
      usertitles_id: this.state.title.value,
      locations_id: this.state.location.value,
      profiles_id: this.state.defaultProfile.value,
      begin_date: this.state.validSince,
      end_date: this.state.validUntil,
    }

    let correctPassword = true

    if (this.state.password !== '' || this.state.passwordConfirmation !== '') {
      if (!ErrorValidation.validation(this.state.parametersToEvaluate, this.state.password).isCorrect) {
        correctPassword = false
      } else if (!ErrorValidation.validation({
        ...this.state.parametersToEvaluate,
        isEqualTo: {
          value: this.state.password,
          message: 'Passwords do not match',
        },
      }, this.state.passwordConfirmation).isCorrect) {
        correctPassword = false
      } else {
        newUser = {
          ...newUser,
          password: this.state.password,
          password2: this.state.passwordConfirmation,
        }
      }
    }

    if (correctPassword) {
      this.setState({
        isLoading: true,
      },
      async () => {
        try {
          await this.props.glpi.updateItem({
            itemtype: itemtype.User,
            input: newUser,
          })
          await this.props.glpi.updateEmails({
            userID: newUser.id,
            currentEmails: this.state.currentEmails,
            newEmails: this.state.emails,
          })
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.saved_profile'),
            type: 'success',
          })
          this.props.changeAction('reload')
        } catch (error) {
          this.props.toast.setNotification(this.props.handleMessage({
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
    this.setState((prevState) => ({
      emails: prevState.emails.slice(0, index).concat(prevState.emails.slice(index + 1)),
    }))
  }

  /**
   * Add an email
   * @function addEmail
   */
  addEmail = () => {
    this.setState((prevState) => ({
      emails: [
        ...prevState.emails,
        {
          email: '',
        },
      ],
    }))
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
   * Render component
   * @function render
   */
  render() {
    let componetRender

    if (this.state.isLoading) {
      componetRender = <Loading message={`${I18n.t('commons.loading')}...`} />
    } else {
      const user = usersScheme({
        realName: this.state.realName,
        firstName: this.state.firstName,
        title: this.state.title,
        location: this.state.location,
        login: this.state.login,
        phone: this.state.phone,
        phone2: this.state.phone2,
        validSince: this.state.validSince,
        administrativeNumber: this.state.administrativeNumber,
        passwordConfirmation: this.state.passwordConfirmation,
        created: this.state.created,
        mobilePhone: this.state.mobilePhone,
        password: this.state.password,
        lastLogin: this.state.lastLogin,
        comments: this.state.comments,
        modified: this.state.modified,
        validUntil: this.state.validUntil,
        parametersToEvaluate: this.state.parametersToEvaluate,
        authentication: this.state.authentication,
        defaultEntity: this.state.defaultEntity,
        defaultProfile: this.state.defaultProfile,
        category: this.state.category,
        emails: this.state.emails,
        changeState: this.changeState,
        changeEmail: this.changeEmail,
        deleteEmail: this.deleteEmail,
        changeSelect: this.changeSelect,
        glpi: this.props.glpi,
      })

      componetRender = (
        <div className="froms Profiles">
          <div className="froms__row froms__row--icon">
            <span className="viewIcon" />
          </div>

          <div className="froms__row">
            <div style={{ overflow: 'hidden', paddingLeft: '20px' }}>
              <IconItemList
                image={this.state.imageProfile}
                type={this.state.typeImageProfile}
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
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  changeAction: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default UsersEditOne
