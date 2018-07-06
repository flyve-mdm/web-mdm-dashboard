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
import I18n from '../../../shared/i18n'
import EmptyMessage from '../../../components/EmptyMessage'
import ContentPane from '../../../components/ContentPane'
import Loader from '../../../components/Loader'
import itemtype from '../../../shared/itemtype'
import getID from '../../../shared/getID'

/**
 * Component with the list of pending invitations
 * @class InvitationsPendingPage
 * @extends PureComponent
 */
class InvitationsPendingPage extends PureComponent {
  /**
   * Handle item list render
   * @constant ItemListRenderer
   * @type {component}
   */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <div style={{ padding: '14px', width: '100%' }}>
      <b>
        {ItemList.data['PluginFlyvemdmInvitationlog.event']}
      </b>
      <br />
      {ItemList.data['PluginFlyvemdmInvitationlog.date_creation']}
    </div>
  ))

  /** @constructor */
  constructor(props) {
    super(props)
    const { history } = this.props

    this.state = {
      layout: {
        type: WinJS.UI.ListLayout,
      },
      isLoading: true,
      itemList: new WinJS.Binding.List([]),
      id: getID(history.location.pathname),
    }
  }

  /**
   * Make the call to update the list
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * Make the call to update the list when it's necessary
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
        ...prevState,
        id: getID(nextProps.history.location.pathname),
        itemList: new WinJS.Binding.List([]),
        isLoading: true,
      }
    }
    return {
      ...prevState,
    }
  }

  /**
   * Get the logs of the invitation and reload the list
   * @function handleRefresh
   * @async
   */
  handleRefresh = async () => {
    const { glpi } = this.props
    const { id } = this.state

    try {
      const logs = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitationlog,
        options: {
          uid_cols: true,
          forcedisplay: [2, 3, 4, 5],
        },
        criteria: [{
          field: '4',
          searchtype: 'equal',
          value: id,
        }],
      })
      this.setState({
        isLoading: false,
        itemList: new WinJS.Binding.List(logs.data),
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        itemList: new WinJS.Binding.List([]),
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
      itemList,
      layout,
    } = this.state

    let listComponent = (
      <ContentPane>
        <div className="list-pane" style={{ margin: '0 10px' }}>
          <div className="content-header">
            <h2 className="content-header__title">
              {I18n.t('invitations.pending')}
            </h2>
          </div>
          <Loader count={1} />
        </div>
      </ContentPane>
    )

    if (!isLoading && itemList.length > 0) {
      listComponent = (
        <ContentPane>
          <div className="list-pane" style={{ margin: '0 10px' }}>
            <div className="content-header">
              <h2 className="content-header__title">
                {I18n.t('invitations.pending')}
              </h2>
            </div>
            <ReactWinJS.ListView
              ref={(listView) => { this.listView = listView }}
              className="list-pane__content win-selectionstylefilled"
              style={{ height: 'calc(100% - 48px)' }}
              itemDataSource={itemList.dataSource}
              itemTemplate={this.ItemListRenderer}
              layout={layout}
              selectionMode="single"
            />
          </div>
        </ContentPane>
      )
    } else if (!isLoading && itemList.length === 0) {
      listComponent = (
        <EmptyMessage message={I18n.t('invitations.no_logs')} />
      )
    }

    return listComponent
  }
}

InvitationsPendingPage.propTypes = {
  history: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
}

export default InvitationsPendingPage
