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
        this.data = await this.props.glpi.getAnItem({
          itemtype: this.props.itemType,
          id: this.props.itemID,
          queryString: this.props.parameters,
        })

        const object = Object.keys(this.props.fields).map(key => ({
          [this.props.fields[key]]: this.data[key],
        }))

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
          const { _devices } = this.data
          this.props.afterLoading(
            _devices.Item_DeviceProcessor[Object.keys(_devices.Item_DeviceProcessor)[0]].deviceprocessors_id,
            _devices.Item_DeviceBattery[Object.keys(_devices.Item_DeviceBattery)[0]].devicebatteries_id,
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
            this.state.data.map(value => (this.buildList(value)))
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
  itemID: PropTypes.number.isRequired,
  fields: PropTypes.object.isRequired,
  parameters: PropTypes.object,
  glpi: PropTypes.object.isRequired,
  afterLoading: PropTypes.func,
  specialFields: PropTypes.object,
}
