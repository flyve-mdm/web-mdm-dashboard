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
import { Icon } from 'office-ui-fabric-react'
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import getID from 'shared/getID'
import publicURL from 'shared/publicURL'
import ContentPane from 'components/ContentPane'
import IconItemList from 'components/IconItemList'
import Confirmation from 'components/Confirmation'
import Loading from 'components/Loading'

/**
 * Component with the content of the users
 * @class UsersContent
 * @extends PureComponent
 */
class UsersContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      id: getID(this.props.history.location.pathname),
      data: undefined,
      emails: [],
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
   * Update the content when it's necessary
   * @function componentDidUpdate
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.handleRefresh()
    }
  }

  /**
   * Make sure that the state and props are in sync for when it is required
   * @static
   * @function getDerivedStateFromProps
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== getID(nextProps.history.location.pathname)) {
      return {
        id: getID(nextProps.history.location.pathname),
        data: undefined,
        emails: [],
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Delete user
   * @function handleDelete
   * @async
   */
  handleDelete = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      const itemListToDelete = [{ id: this.state.id }]

      this.setState({
        isLoading: true,
      })

      try {
        await this.props.glpi.deleteItem({
          itemtype: itemtype.User,
          input: itemListToDelete,
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.elements_successfully_removed'),
          type: 'success',
        })
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
        this.props.history.push(`${publicURL}/app/users`)
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
      }
    }
  }

  /**
   * Update the content
   * @function handleRefresh
   * @async
   */
  handleRefresh = async () => {
    try {
      const { id } = this.state
      const user = await this.props.glpi.getAnItem({
        itemtype: itemtype.User,
        id,
      })
      const emails = await this.props.glpi.getSubItems({
        itemtype: itemtype.User,
        id,
        subItemtype: 'UserEmail',
      })
      this.setState({
        data: user,
        emails,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error,
      }))
      this.props.history.push(`${publicURL}/app/users`)
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    let renderComponent
    if (!this.state.data) {
      renderComponent = <Loading message={`${I18n.t('commons.loading')}...`} />
    } else {
      const imageProfile = this.state.data.picture
        ? this.state.data.picture
        : 'profile.png'
      renderComponent = (
        <React.Fragment>
          <div className="content-header">
            <div className="item-info">
              <IconItemList image={imageProfile} size={100} />
              <div>
                <div className="item-info__name">
                  <b>
                    {this.state.data.name}
                  </b>
                </div>

                <span className="item-info__message">
                  {this.state.data.realname}
                </span>

                <br />

                <span className="item-info__source">
                  {I18n.t('commons.joined')}
                  {' '}
                  {this.state.data.date_creation}
                </span>

                <br />

                <Icon
                  iconName="Edit"
                  style={{ padding: '0 10px', fontSize: '20px' }}
                  onClick={() => this.props.history.push(`${publicURL}/app/users/${this.state.id}/edit`)}
                />

                <Icon
                  iconName="Delete"
                  style={{ padding: '0 10px', fontSize: '20px' }}
                  onClick={this.handleDelete}
                />

              </div>
            </div>
          </div>
          <div className="separator" />
          <div className="content-info">
            <ul>
              <li>
                <Icon iconName="Phone" />
                <div>
                  <a href={this.state.data.mobile ? `tel: ${this.state.data.mobile}` : '#call'}>
                    {I18n.t('commons.call_mobile')}
                  </a>
                  <div>
                    {this.state.data.mobile ? this.state.data.mobile : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <Icon iconName="Phone" />
                <div>
                  <a href={this.state.data.phone2 ? `tel: ${this.state.data.phone2}` : '#call'}>
                    {I18n.t('commons.call_work')}
                  </a>
                  <div>
                    {this.state.data.phone2 ? this.state.data.phone2 : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <Icon iconName="Mail" />
                <div>
                  <a href={this.state.emails.length > 0 ? `mailto: ${this.state.emails[0].email}` : '#email'}>
                    {I18n.t('commons.email')}
                  </a>
                  <div>
                    {this.state.emails.length > 0 ? this.state.emails[0].email : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Confirmation title={I18n.t('users.delete_one')} message={this.state.data.name} reference={(el) => { this.contentDialog = el }} />
        </React.Fragment>
      )
    }
    return (
      <ContentPane>
        { renderComponent }
      </ContentPane>
    )
  }
}

UsersContent.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default UsersContent
