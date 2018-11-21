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
      requestingInventory: false,
      fleetID: undefined,
      computersID: undefined,
      coreID: undefined,
    }
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
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle refresh of the inventory
   * @function handleRefresh
   */
  handleRefresh = () => {
    this.setState({
      fleetID: undefined,
      computersID: undefined,
      coreID: undefined,
      requestingInventory: false,
    })
    this.inventory.handleRefresh()
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

          <Inventory
            title={I18n.t('commons.agent')}
            itemType="PluginFlyvemdmAgent"
            itemID={this.state.id}
            fields={{
              id: 'id',
              name: 'name',
              version: 'version',
              mdm_type: 'mdm_type',
              enroll_status: 'enroll_status',
              last_contact: 'last_contact',
              last_report: 'last_report',
            }}
            glpi={this.props.glpi}
            afterLoading={(fleetID, computersID) => {
              this.setState({
                fleetID,
                computersID,
              })
            }}
            ref={(inventory) => { this.inventory = inventory }}
          />

          {
            this.state.fleetID && (
              <Inventory
                title={I18n.t('commons.fleet')}
                itemType="PluginFlyvemdmFleet"
                itemID={this.state.fleetID}
                fields={{ id: 'id', name: 'name' }}
                glpi={this.props.glpi}
              />
            )
          }

          {
            this.state.computersID && (
              <Inventory
                title={I18n.t('commons.device')}
                itemType="Computer"
                itemID={this.state.computersID}
                fields={{
                  id: 'id',
                  name: 'name',
                  uuid: 'uuid',
                  date_creation: 'creation',
                  date_mod: 'modification',
                  computermodels_id: 'model',
                  computertypes_id: 'type',
                  manufacturers_id: 'manufacturer',
                  serial: 'serial',
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
                afterLoading={(coreID) => {
                  this.setState({ coreID })
                }}
                ref={(device) => { this.device = device }}
              />
            )
          }

          {
            this.state.coreID && (
              <Inventory
                title={I18n.t('commons.device_processor')}
                itemType="DeviceProcessor"
                itemID={this.state.coreID}
                fields={{
                  id: 'id',
                  designation: 'name',
                  frequence: 'cpu_frequency',
                }}
                specialFields={{
                  number_cores: (this.device.data._devices.Item_DeviceProcessor[Object.keys(this.device.data._devices.Item_DeviceProcessor)[0]].nbcores || I18n.t('commons.n/a')),
                }}
                glpi={this.props.glpi}
              />
            )
          }
        </div>
      </div>
    )
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
