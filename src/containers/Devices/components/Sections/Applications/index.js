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
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import EmptyMessage from 'components/EmptyMessage'
import ContentPane from 'components/ContentPane'
import Loader from 'components/Loader'
import ApplicationDetail from './ApplicationDetail'

/**
 * @class Applications
 * @extends PureComponent
 */
export default class Applications extends PureComponent {
  /**
   * handle item list render
   * @function ItemListRenderer
   */
  ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
    const styles = {
      boxSizing: 'border-box',
      padding: '15px',
      float: 'left',
      overflow: 'auto',
    }

    return (
      <div
        onClick={() => this.selectApplication(ItemList.data['Software.id'])}
        role="menuitem"
        tabIndex="0"
      >
        <div style={{ ...styles, width: '15%' }}>
          {ItemList.data['Software.id']}
        </div>
        <div style={{ ...styles, width: '40%' }}>
          {ItemList.data['Software.name']}
        </div>
        <div style={{ ...styles, width: '35%' }}>
          {ItemList.data['Software.date_mod']}
        </div>
      </div>
    )
  })

  /** @constructor */
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.id,
      update: this.props.update,
      layout: {
        type: WinJS.UI.ListLayout,
      },
      isLoading: true,
      itemList: new WinJS.Binding.List([]),
      applicationSelected: null,
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
        isLoading: true,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * handle fetch devices
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    const {
      update,
    } = this.state
    const { glpi } = this.props
    this.setState({
      applicationSelected: null,
    }, async () => {
      if (update) {
        try {
          const {
            computers_id: computersID,
          } = await glpi.getAnItem({
            id: this.state.id,
            itemtype: itemtype.PluginFlyvemdmAgent,
          })
          const {
            totalcount,
          } = await glpi.searchItems({
            itemtype: itemtype.Software,
            options: {
              uid_cols: true,
              forcedisplay: [2],
            },
            range: '0-0',
            metacriteria: [{
              link: 'AND',
              itemtype: itemtype.Computer,
              field: 2,
              searchtype: 'equals',
              value: computersID,
            }],
          })
          const softwareList = await glpi.searchItems({
            itemtype: itemtype.Software,
            options: {
              uid_cols: true,
              forcedisplay: [1, 2, 19],
            },
            range: `0-${totalcount}`,
            metacriteria: [{
              link: 'AND',
              itemtype: itemtype.Computer,
              field: 2,
              searchtype: 'equals',
              value: computersID,
            }],
          })

          this.setState({
            isLoading: false,
            itemList: new WinJS.Binding.List(softwareList.data),
          })
        } catch (error) {
          this.setState({
            isLoading: false,
            itemList: new WinJS.Binding.List([]),
          })
        }
      }
    })
  }

  /**
   * handle select applications
   * @function handleRefresh
   * @param {object} applicationSelected
   */
  selectApplication = applicationSelected => this.setState({
    applicationSelected,
  })

  render() {
    let renderComponent

    if (this.state.applicationSelected) {
      renderComponent = (
        <ApplicationDetail
          id={this.state.applicationSelected}
          glpi={this.props.glpi}
          selectApplication={this.selectApplication}
          toast={this.props.toast}
          handleMessage={this.props.handleMessage}
        />
      )
    } else if (this.state.isLoading) {
      renderComponent = (
        <div style={{ padding: '20px' }}>
          <Loader type="content" />
        </div>
      )
    } else if (this.state.itemList.length > 0) {
      const stylesHeader = {
        boxSizing: 'border-box',
        padding: '15px',
        float: 'left',
        overflow: 'auto',
      }
      const header = (
        <React.Fragment>
          <div style={{ ...stylesHeader, width: '15%' }}>
            #
          </div>
          <div style={{ ...stylesHeader, width: '40%' }}>
            {I18n.t('devices.applications.id')}
          </div>
          <div style={{ ...stylesHeader, width: '35%' }}>
            {I18n.t('devices.applications.last_modification')}
          </div>
        </React.Fragment>
      )
      renderComponent = (
        <ContentPane className="applications">
          <div className="list-pane" style={{ padding: 0 }}>
            <ReactWinJS.ListView
              ref={(listView) => { this.listView = listView }}
              className="list-pane__content win-selectionstylefilled"
              headerComponent={header}
              itemDataSource={this.state.itemList.dataSource}
              itemTemplate={this.ItemListRenderer}
              layout={this.state.layout}
              selectionMode="single"
            />
          </div>
        </ContentPane>
      )
    } else {
      renderComponent = (
        <EmptyMessage message={I18n.t('devices.applications.empty_message')} />
      )
    }

    return renderComponent
  }
}
/** Applications propTypes */
Applications.propTypes = {
  id: PropTypes.string.isRequired,
  glpi: PropTypes.object.isRequired,
  update: PropTypes.bool.isRequired,
  toast: PropTypes.object.isRequired,
  handleMessage: PropTypes.func.isRequired,
}
