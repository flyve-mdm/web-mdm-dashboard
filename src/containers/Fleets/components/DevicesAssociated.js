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
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import getID from 'shared/getID'
import publicURL from 'shared/publicURL'
import ContentPane from 'components/ContentPane'
import Loading from 'components/Loading'
import EmptyMessage from 'components/EmptyMessage'
import withGLPI from 'hoc/withGLPI'

/**
 * @class DevicesAssociated
 * @extends PureComponent
 */
class DevicesAssociated extends PureComponent {
  /**
   * Get header render devices list
   * @constant headerComponent
   * @type {component}
   */
  headerComponent = (
    <React.Fragment>
      <span className="id">
        #
      </span>
      <span className="name">
        {I18n.t('commons.name')}
      </span>
    </React.Fragment>
  )

  /**
   * Get content render devices list
   * @constant ItemListRenderer
   * @type {component}
   */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => this.props.history.push(`${publicURL}/app/devices/${ItemList.data[`${itemtype.PluginFlyvemdmAgent}.id`]}`)}
      role="link"
      tabIndex="0"
    >
      <span className="id">
        {ItemList.data[`${itemtype.PluginFlyvemdmAgent}.id`]}
      </span>
      <span className="name">
        {ItemList.data[`${itemtype.PluginFlyvemdmAgent}.name`]}
      </span>
    </div>
  ))

  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      devices: undefined,
      isLoading: true,
      name: undefined,
      layout: {
        type: WinJS.UI.ListLayout,
      },
      itemList: new WinJS.Binding.List([]),
    }
  }

  /**
   * @function componentDidMount
   * @async
   */
  componentDidMount = async () => {
    try {
      const {
        name,
      } = await this.props.glpi.getAnItem({
        itemtype: itemtype.PluginFlyvemdmFleet,
        id: getID(this.props.history.location.pathname),
      })

      const devices = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmAgent,
        options: {
          uid_cols: true,
          forcedisplay: [2, 3],
        },
        criteria: [{
          link: 'and',
          field: 3,
          searchtype: 'contains',
          value: name,
        }],
      })
      this.setState({
        name,
        devices,
        isLoading: false,
        itemList: new WinJS.Binding.List(devices.data),
      })
    } catch (error) {
      this.setState({
        isLoading: false,
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    return (
      <ContentPane className="fleets">
        {
          this.state.isLoading
            ? <Loading message={`${I18n.t('commons.loading')}...`} />
            : (
              (!this.state.devices || this.state.devices.totalcount === 0)
                ? <EmptyMessage message={I18n.t('fleets.no_associated_devices')} />
                : (
                  <React.Fragment>
                    <h2>
                      {I18n.t('fleets.devices_of')}
                      {` '${this.state.name}' `}
                    </h2>
                    <div className="list-pane">
                      <ReactWinJS.ListView
                        ref={(listView) => { this.listView = listView }}
                        className="list-pane__content win-selectionstylefilled"
                        itemDataSource={this.state.itemList.dataSource}
                        itemTemplate={this.ItemListRenderer}
                        headerComponent={this.headerComponent}
                        layout={this.state.layout}
                        selectionMode="single"
                      />
                    </div>
                  </React.Fragment>
                )
            )
        }
      </ContentPane>
    )
  }
}

DevicesAssociated.propTypes = {
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default withGLPI(DevicesAssociated)
