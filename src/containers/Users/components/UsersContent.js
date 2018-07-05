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
import ContentPane from '../../../components/ContentPane'
import IconItemList from '../../../components/IconItemList'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import publicURL from '../../../shared/publicURL'

/**
 * Component with the content of the users
 * @class UsersContent
 * @extends PureComponent
 */
class UsersContent extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    const { history } = this.props

    this.state = {
      id: getID(history.location.pathname),
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
    const { id } = this.state
    if (prevState.id !== id) {
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
      const {
        setNotification,
        handleMessage,
        selectedItems,
      } = this.props

      const itemListToDelete = selectedItems.map(item => ({
        id: item['User.id'],
      }))

      this.setState({
        isLoading: true,
      })

      try {
        const {
          glpi,
          changeAction,
          changeSelectionMode,
          history,
        } = this.props

        await glpi.deleteItem({
          itemtype: itemtype.User,
          input: itemListToDelete,
        })
        setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.elements_successfully_removed'),
          type: 'success',
        })
        changeAction('reload')
        changeSelectionMode(false)
        history.push(`${publicURL}/app/users`)
      } catch (error) {
        setNotification(handleMessage({
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
      const { glpi } = this.props
      const { id } = this.state

      const user = await glpi.getAnItem({
        itemtype: itemtype.User,
        id,
      })

      const emails = await glpi.getSubItems({
        itemtype: itemtype.User,
        id,
        subItemtype: 'UserEmail',
      })
      this.setState({
        data: user,
        emails,
      })
    } catch (error) {
      const {
        handleMessage,
        setNotification,
        history,
      } = this.props

      setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
      history.push(`${publicURL}/app/users`)
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      data,
      emails,
      id,
    } = this.state
    const {
      selectedItems,
      history,
    } = this.props

    let renderComponent
    if (!data) {
      renderComponent = <Loading message={`${I18n.t('commons.loading')}...`} />
    } else {
      const imageProfile = data.picture
        ? data.picture
        : 'profile.png'
      renderComponent = (
        <React.Fragment>
          <div className="content-header">
            <div className="item-info">
              <IconItemList image={imageProfile} size={100} />
              <div>
                <div className="item-info__name">
                  <b>
                    {data.name}
                  </b>
                </div>

                <span className="item-info__message">
                  {data.realname}
                </span>

                <br />

                <span className="item-info__source">
                  {I18n.t('commons.joined')}
                  {' '}
                  {data.date_creation}
                </span>

                <br />

                <span
                  className="editIcon"
                  style={{ padding: '0 10px', fontSize: '20px' }}
                  onClick={() => history.push(`${publicURL}/app/users/${id}/edit`)}
                  role="button"
                  tabIndex="0"
                />

                <span
                  className="deleteIcon"
                  style={{ padding: '0 10px', fontSize: '20px', display: selectedItems.length === 0 ? 'none' : '' }}
                  onClick={this.handleDelete}
                  role="button"
                  tabIndex="0"
                />

              </div>
            </div>
          </div>
          <div className="separator" />
          <div className="content-info">
            <ul>
              <li>
                <span className="phoneIcon" />
                <div>
                  <a href={data.mobile ? `tel: ${data.mobile}` : '#call'}>
                    {I18n.t('commons.call_mobile')}
                  </a>
                  <div>
                    {data.mobile ? data.mobile : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <span className="phoneIcon" />
                <div>
                  <a href={data.phone2 ? `tel: ${data.phone2}` : '#call'}>
                    {I18n.t('commons.call_work')}
                  </a>
                  <div>
                    {data.phone2 ? data.phone2 : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
              <li>
                <span className="emailIcon" />
                <div>
                  <a href={emails.length > 0 ? `mailto: ${emails[0].email}` : '#email'}>
                    {I18n.t('commons.email')}
                  </a>
                  <div>
                    {emails.length > 0 ? emails[0].email : I18n.t('commons.not_available')}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Confirmation title={I18n.t('users.delete_one')} message={data.name} reference={(el) => { this.contentDialog = el }} />
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

UsersContent.defaultProps = {
  selectedItems: null,
}

UsersContent.propTypes = {
  selectedItems: PropTypes.array,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default UsersContent
