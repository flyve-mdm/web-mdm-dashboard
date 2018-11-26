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
import Loader from 'components/Loader'
import I18n from 'shared/i18n'

// function getInternalData(base, type, data) {
//   const keys = Object.keys(base[type])
//   if (keys.length > 1) {
//     return keys.map(key => (
//       base[type][key][data]
//     ))
//   }

//   return base[type][keys[0]][data]
// }

/**
 * @class Inventory
 * @extends PureComponent
 */
export default class Inventory extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * handle request refresh inventory
   * @function handleRefresh
   * */
  handleRefresh = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      try {
        let object = []

        if (Array.isArray(this.props.itemID)) {
          const data = []

          for (let i = 0; i < this.props.itemID.length; i += 1) {
            data.push(
              // eslint-disable-next-line no-await-in-loop
              await this.props.glpi.getAnItem({
                itemtype: this.props.itemType,
                id: this.props.itemID[i],
                queryString: this.props.parameters,
              }),
            )

            if (this.props.itemType === 'Item_DeviceHardDrive') {
              data[i] = {
                ...data[i],
                // eslint-disable-next-line no-await-in-loop
                ...await this.props.glpi.getAnItem({
                  itemtype: 'DeviceHardDrive',
                  id: data[i].deviceharddrives_id,
                }),
              }
            }
          }
          this.data = data

          object = this.data.map(d => Object.keys(this.props.fields)
            .map(key => ({
              [this.props.fields[key]]: d[key],
            })))
        } else {
          this.data = await this.props.glpi.getAnItem({
            itemtype: this.props.itemType,
            id: this.props.itemID,
            queryString: this.props.parameters,
          })

          object = Object.keys(this.props.fields).map(key => ({
            [this.props.fields[key]]: this.data[key],
          }))
        }

        if (this.props.itemType === 'DeviceProcessor') {
          const manufacturer = await this.props.glpi.getAnItem({
            itemtype: 'Manufacturer',
            id: this.data.manufacturers_id,
          })
          object.push({
            manufacturer: (manufacturer.name || I18n.t('commons.n/a')),
          })
        }

        if (this.props.itemType === 'DeviceBattery') {
          const type = await this.props.glpi.getAnItem({
            itemtype: 'DeviceBatteryType',
            id: this.data.devicebatterytypes_id,
          })
          object.push({
            type: (type.name || I18n.t('commons.n/a')),
          })
        }

        if (this.props.itemType === 'Computer') {
          const operatingSystem = await this.props.glpi.searchItems({
            itemtype: 'Computer',
            criteria: [{
              field: 2,
              link: 'AND',
              searchtype: 'contains',
              value: this.props.itemID,
            }],
            metacriteria: [{
              field: 'common',
              itemtype: 'OperatingSystem',
              link: 'AND',
              searchtype: 'contains',
              value: '',
            }],
          })

          object.push({
            'operating-system': (operatingSystem.data[0][45] || I18n.t('commons.n/a')),
          })
        }

        this.setState({
          isLoading: false,
          data: object,
        })

        if (this.props.itemType === 'PluginFlyvemdmAgent') {
          this.props.afterLoading(
            this.data.plugin_flyvemdm_fleets_id,
            this.data.computers_id,
          )
        }

        if (this.props.itemType === 'Computer') {
          const { _devices, _networkports } = this.data

          this.props.afterLoading(
            _devices.Item_DeviceProcessor[Object.keys(_devices.Item_DeviceProcessor)[0]].deviceprocessors_id,
            _devices.Item_DeviceBattery[Object.keys(_devices.Item_DeviceBattery)[0]].devicebatteries_id,
            _networkports.NetworkPortEthernet[0].netport_id,
            Object.keys(_devices.Item_DeviceHardDrive),
          )
        }
      } catch (error) {
        this.setState({
          isLoading: false,
          data: undefined,
        })
      }
    })
  }

  /**
   * handle build inventory list
   * @function buildList
   * @param {object} value
   */
  buildList = value => Object.keys(value).map(index => (
    <div
      className="list-content"
      key={`buildList-${index.toString()}`}
    >
      <div className="list-col">
        {I18n.t(`commons.${index.toString()}`)}
      </div>
      <div className="list-col">
        {value[index]}
      </div>
    </div>
  ))

  /**
   * handle build inventory list
   * @function buildList
   * @param {object} elements
   */
  buildSpecialList = (elements) => {
    const specialList = Object.keys(elements).map((element, index) => (
      <div
        className="list-content"
        key={`buildSpecialList-${index.toString()}`}
      >
        <div className="list-col">
          {I18n.t(`commons.${element}`)}
        </div>
        <div className="list-col">
          {elements[element]}
        </div>
      </div>
    ))

    return specialList
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div style={{ padding: '20px' }}>
          <Loader type="content" />
        </div>
      )
    } if (this.state.data) {
      return (
        <div>
          <div className="title">
            {this.props.title}
          </div>
          {
            this.state.data.map((value, index) => {
              if (Array.isArray(value)) {
                return (
                  <>
                    {
                      index !== 0 && (
                        <>
                          <div /> {/* Used to make the colors of the zebra list look good  */}
                          <hr />
                        </>
                      )
                    }
                    {
                      value.map(x => (
                        this.buildList(x)
                      ))
                    }
                  </>
                )
              }
              return this.buildList(value)
            })
          }
          {
            this.props.specialFields && (
              this.buildSpecialList(this.props.specialFields)
            )
          }
        </div>
      )
    }
    return (null)
  }
}

/** Inventory defaultProps */
Inventory.defaultProps = {
  parameters: {},
  afterLoading: () => {},
  specialFields: null,
}

/** Inventory propTypes */
Inventory.propTypes = {
  title: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  itemID: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
  fields: PropTypes.object.isRequired,
  parameters: PropTypes.object,
  glpi: PropTypes.object.isRequired,
  afterLoading: PropTypes.func,
  specialFields: PropTypes.object,
}
