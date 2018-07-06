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
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'
import withGLPI from '../../../hoc/withGLPI'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'
import EmptyMessage from '../../../components/EmptyMessage'
import publicURL from '../../../shared/publicURL'

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
  ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
    const { history } = this.props

    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => history.push(`${publicURL}/app/devices/${ItemList.data[`${itemtype.PluginFlyvemdmAgent}.id`]}`)}
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
    )
  })

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
    const {
      glpi,
      history,
    } = this.props

    try {
      const {
        name,
      } = await glpi.getAnItem({
        itemtype: itemtype.PluginFlyvemdmFleet,
        id: getID(history.location.pathname),
      })

      const devices = await glpi.searchItems({
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
    const {
      isLoading,
      devices,
      name,
      itemList,
      layout,
    } = this.state


    return (
      <ContentPane className="fleets">
        {
          isLoading
            ? <Loading message={`${I18n.t('commons.loading')}...`} />
            : (
              (!devices || devices.totalcount === 0)
                ? <EmptyMessage message={I18n.t('fleets.no_associated_devices')} />
                : (
                  <React.Fragment>
                    <h2>
                      {I18n.t('fleets.devices_of')}
                      {` '${name}' `}
                    </h2>
                    <div className="list-pane">
                      <ReactWinJS.ListView
                        ref={(listView) => { this.listView = listView }}
                        className="list-pane__content win-selectionstylefilled"
                        itemDataSource={itemList.dataSource}
                        itemTemplate={this.ItemListRenderer}
                        headerComponent={this.headerComponent}
                        layout={layout}
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
