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
import I18n from 'shared/i18n'
import validateData from 'shared/validateData'
import itemtype from 'shared/itemtype'
import getID from 'shared/getID'
import authtype from 'shared/authtype'
import ConstructInputs from 'components/Forms'
import ContentPane from 'components/ContentPane'
import IconItemList from 'components/IconItemList'
import {
  usersScheme,
} from 'components/Forms/Schemas'
import Loading from 'components/Loading'
import ErrorValidation from 'components/ErrorValidation'

/**
 * Component with the user edit form
 * @class UsersAdd
 * @extends PureComponent
 */
class UsersAdd extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      login: '',
      firstName: '',
      realName: '',
      phone: '',
      mobilePhone: '',
      phone2: '',
      administrativeNumber: '',
      emails: [],
      imageProfile: undefined,
      password: null,
      passwordConfirmation: null,
      category: {},
      defaultEntity: {},
      comments: '',
      typeImageProfile: {},
      title: {},
      location: {},
      defaultProfile: {},
      validSince: {},
      validUntil: {},
      authentication: {},
    }
  }

  /**
   * Make the call to update the content
   * @function componentDidMount
   */
  componentDidMount() {
    // this.handleRefresh()
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
    this.setState(prevState => ({
      emails: prevState.emails.slice(0, index).concat(prevState.emails.slice(index + 1)),
    }))
  }

  /**
   * Add an email
   * @function addEmail
   */
  addEmail = () => {
    this.setState(prevState => ({
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
        newUser: true,
      })

      componetRender = (
        <div className="froms Profiles">
          <div className="froms__row froms__row--icon">
            <span className="iconFont viewIcon" />
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

UsersAdd.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  changeAction: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default UsersAdd
