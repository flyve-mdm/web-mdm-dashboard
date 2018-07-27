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
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import IconItemList from 'components/IconItemList'
import Confirmation from 'components/Confirmation'
import Loading from 'components/Loading'
import ContentPane from 'components/ContentPane'

/**
 * @class Main
 * @extends PureComponent
 */
export default class Main extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      update: this.props.update,
      data: undefined,
      sendingPing: false,
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id || prevState.update !== this.state.update) {
      this.handleRefresh()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.id !== nextProps.id || prevState.update !== nextProps.update) {
      return {
        ...prevState,
        id: nextProps.id,
        update: nextProps.update,
        data: undefined,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle refresh detail devices information
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    if (this.state.update) {
      try {
        const { id } = this.state
        const data = await this.props.glpi.getAnItem({
          itemtype: itemtype.PluginFlyvemdmAgent,
          id,
        })

        this.setState({
          data,
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
        }))
        this.props.history.push(`${publicURL}/app/devices`)
      }
    }
  }

  /**
   * handle delete selected device
   * @async
   * @function handleRefresh
   */
  handleDelete = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      this.setState({
        isLoading: true,
      })

      this.props.glpi.deleteItem({
        itemtype: itemtype.PluginFlyvemdmAgent,
        id: this.state.id,
      })
        .then(() => {
          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.device_successfully_removed'),
            type: 'success',
          })
          this.props.changeSelectionMode(false)
          this.props.history.push(`${publicURL}/app/devices`)
          this.props.changeAction('reload')
        })
        .catch((error) => {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
        })
    }
  }

  /**
   * handle edit selected device
   * @function handleEdit
   */
  handleEdit = () => {
    const path = `${publicURL}/app/devices/${this.state.id}/edit`
    this.props.history.push(path)
  }

  /**
   * handle ping to device
   * @function ping
   */
  ping = () => {
    this.setState({
      sendingPing: true,
    }, async () => {
      try {
        const response = await this.props.glpi.genericRequest({
          path: `${itemtype.PluginFlyvemdmAgent}/${this.state.id}`,
          requestParams: {
            method: 'PUT',
            body: JSON.stringify({
              input: {
                _ping: '',
              },
            }),
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message ? response[0].message : I18n.t('notifications.ping_sent'),
          type: 'success',
        })
        this.setState({
          sendingPing: false,
        }, () => {
          this.handleRefresh()
        })
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
          displayErrorPage: false,
        }))
        this.setState({
          sendingPing: false,
        })
      }
    })
  }

  render() {
    let renderComponent
    if (this.state.data === undefined || this.state.isLoading) {
      renderComponent = (
        <Loading message={`${I18n.t('commons.loading')}...`} />
      )
    } else {
      const imageAgent = this.state.data.mdm_type ? `${this.state.data.mdm_type}.png` : null
      let iconComponent

      if (imageAgent) {
        iconComponent = (
          <IconItemList
            image={imageAgent}
            size={72}
            backgroundColor="transparent"
          />
        )
      } else {
        iconComponent = (
          <IconItemList size={72} />
        )
      }
      renderComponent = (
        <ContentPane className="devices">
          <div className="content-header">
            <div className="item-info">
              {iconComponent}
              <div>
                <div className="item-info__name">
                  {this.state.data.name}
                </div>
                <div className="item-info__message">
                  {
                    this.state.data.is_online === 1
                      ? I18n.t('commons.online')
                      : I18n.t('commons.offline')
                  }
                </div>
                <div className="item-info__source">
                  {this.state.data.last_contact}
                  &nbsp;
                  {' '}
                  {I18n.t('devices.main.last_contact')}
                </div>
                <div style={{ overflow: 'auto' }}>
                  <div>
                    <button
                      className="btn btn--secondary"
                      style={{ float: 'left', marginTop: 5, marginBottom: 5 }}
                      onClick={this.ping}
                      type="button"
                    >
                      {I18n.t('commons.ping')}
                    </button>
                    {
                      this.state.sendingPing
                        ? <Loading small />
                        : ''
                    }
                  </div>
                </div>
                <div>
                  <Icon
                    iconName="Edit"
                    style={{ marginRight: '20px', fontSize: '20px' }}
                    onClick={this.handleEdit}
                  />
                  <Icon
                    iconName="Delete"
                    style={{ marginRight: '20px', fontSize: '20px' }}
                    onClick={this.handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="separator" />
          <div className="content-info">
            <div className="title">
              {I18n.t('commons.version')}
            </div>
            <div style={{ paddingLeft: 20 }}>
              {this.state.data.version}
            </div>
            <div className="title">
              {I18n.t('commons.type')}
            </div>
            <div style={{ paddingLeft: 20 }}>
              {this.state.data.mdm_type}
            </div>
          </div>

          <Confirmation
            title={I18n.t('devices.delete')}
            message={this.state.data.name}
            reference={(el) => { this.contentDialog = el }}
          />
        </ContentPane>
      )
    }
    return renderComponent
  }
}
/** Main propTypes */
Main.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  changeAction: PropTypes.func.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
}
