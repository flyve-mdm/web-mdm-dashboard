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
import itemtype from 'shared/itemtype'
import Loader from 'components/Loader'
import Loading from 'components/Loading'
import Inventory from './Inventory'

/**
 * @class SystemReport
 * @extends PureComponent
 */
export default class SystemReport extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      update: this.props.update,
      data: undefined,
      isLoading: true,
      requestingInventory: false,
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
        isLoading: true,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle refresh system report
   * @function handleRefresh
   */
  handleRefresh = () => {
    if (this.state.update) {
      this.setState({
        isLoading: true,
        requestingInventory: false,
      }, async () => {
        try {
          const { id } = this.state
          const data = await this.props.glpi.getAnItem({
            itemtype: itemtype.PluginFlyvemdmAgent,
            id,
          })
          this.setState({
            isLoading: false,
            data,
          })
        } catch (error) {
          this.props.toast.setNotification(this.props.handleMessage({
            type: 'alert',
            message: error,
          }))
        }
      })
    }
  }

  /**
   * handle request inventory
   * @function requestInventory
   */
  requestInventory = () => {
    this.setState({
      requestingInventory: true,
    }, async () => {
      try {
        const response = await this.props.glpi.genericRequest({
          path: `${itemtype.PluginFlyvemdmAgent}/${this.state.id}`,
          requestParams: {
            method: 'PUT',
            body: JSON.stringify({
              input: {
                _inventory: '',
              },
            }),
          },
        })
        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: response[0].message,
          type: 'success',
        })
        this.handleRefresh()
      } catch (error) {
        this.props.toast.setNotification(this.props.handleMessage({
          type: 'alert',
          message: error,
          displayErrorPage: false,
        }))
        this.setState({
          requestingInventory: false,
        })
      }
    })
  }

  render() {
    if (this.state.isLoading && !this.state.data) {
      return (
        <div style={{ padding: '20px' }}>
          <Loader type="content" />
        </div>
      )
    } if (!this.state.isLoading && this.state.data) {
      return (
        <div className="devices">
          <div className="system-report">
            <div className="request-inventory">
              <button
                className="btn btn--secondary"
                onClick={this.requestInventory}
                type="button"
              >
                {I18n.t('devices.system_report.request_inventory')}
              </button>
              {this.state.requestingInventory ? <Loading small style={{ paddingTop: '6px' }} /> : ''}
            </div>
            <div className="title">
              {I18n.t('commons.agent')}
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.id')}
              </div>
              <div className="list-col">
                {this.state.data.id}
              </div>
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.name')}
              </div>
              <div className="list-col">
                {this.state.data.name}
              </div>
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.version')}
              </div>
              <div className="list-col">
                {this.state.data.version}
              </div>
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.mdm_type')}
              </div>
              <div className="list-col">
                {this.state.data.mdm_type}
              </div>
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.last_contact')}
              </div>
              <div className="list-col">
                {this.state.data.last_contact}
              </div>
            </div>
            <div className="list-content">
              <div className="list-col">
                {I18n.t('commons.last_report')}
              </div>
              <div className="list-col">
                {this.state.data.last_report ? this.state.data.last_report : 'N/A'}
              </div>
            </div>

            <Inventory
              title={I18n.t('commons.fleet')}
              itemType="PluginFlyvemdmFleet"
              itemID={this.state.data.plugin_flyvemdm_fleets_id}
              fields={{ id: 'ID', name: 'Name' }}
              glpi={this.props.glpi}
            />

            <Inventory
              title={I18n.t('commons.device')}
              itemType="Computer"
              itemID={this.state.data.computers_id}
              fields={{
                id: 'ID',
                name: 'Name',
                uuid: 'UUID',
                date_creation: 'Creation',
                date_mod: 'Modification',
                computermodels_id: 'Model',
                computertypes_id: 'Type',
                manufacturers_id: 'Manufacturer',
                serial: 'Serial',
              }}
              parameters={{
                expand_dropdowns: true,
                with_devices: true,
                with_disks: true,
                with_softwares: true,
                with_connections: true,
                with_networkports: true,
              }}
              glpi={this.props.glpi}
            />
          </div>
        </div>
      )
    }
    return ''
  }
}
/** SystemReport propTypes */
SystemReport.propTypes = {
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
}
