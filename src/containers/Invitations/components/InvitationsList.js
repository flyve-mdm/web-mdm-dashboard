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
import {
  I18n,
} from 'react-i18nify'
import InvitationsItemList from './InvitationsItemList'
import BuildItemList from '../../../shared/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

/**
 * Component with the list of invitations
 * @class InvitationsList
 * @extends PureComponent
 */
export default class InvitationsList extends PureComponent {
  /**
   * Handle item list render
   * @constant ItemListRenderer
   * @type {component}
   */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <InvitationsItemList itemList={ItemList.data} size={42} />
  ))

  /**
   * Handle list header render
   * @constant groupHeaderRenderer
   * @type {component}
   */
  groupHeaderRenderer = ReactWinJS.reactRenderer(item => (
    <div>
      {item.data.title}
    </div>
  ))

  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      layout: {
        type: WinJS.UI.ListLayout,
      },
      isLoading: false,
      isLoadingMore: false,
      itemList: new WinJS.Binding.List([]),

      order: 'ASC',
      totalcount: 0,
      pagination: {
        start: 0,
        page: 1,
        count: 15,
      },
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
   * Validate if 'load more data' button is necessary.
   * And force layout of the toolBar
   * @function componentDidUpdate
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    const {
      totalcount,
      pagination,
      isLoadingMore,
    } = this.state
    const {
      action,
      changeAction,
      selectedItems,
      selectionMode,
    } = this.props

    if (this.listView) {
      this.listView.winControl.footer.style.outline = 'none'
      this.listView.winControl.footer.style.height = totalcount > (pagination.page * pagination.count)
        ? isLoadingMore
          ? '100px'
          : '42px'
        : '1px'
    }
    if (this.toolBar) {
      this.toolBar.winControl.forceLayout()
    }

    if (action === 'reload') {
      this.handleRefresh()
      changeAction(null)
    }

    if (prevProps.selectedItems.length > 0 && selectedItems.length === 0 && !selectionMode) {
      if (this.listView) {
        this.listView.winControl.selection.clear()
      }
    }
  }

  /**
   * Clean the list
   * @constant componentWillUnmount
   */
  componentWillUnmount() {
    const { changeSelectionMode } = this.props

    changeSelectionMode(false)
  }

  /**
   * Handle change selection mode
   * @function handleToggleSelectionMode
   */
  handleToggleSelectionMode = () => {
    const {
      history,
      changeSelectionMode,
      changeSelectedItems,
      selectionMode,
    } = this.props

    history.push(`${publicURL}/app/invitations`)
    changeSelectionMode(!selectionMode)
    changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * Handle selection changed
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleSelectionChanged = (eventObject) => {
    const { itemList } = this.state
    const {
      changeSelectedItems,
      selectionMode,
      history,
    } = this.props

    const listView = eventObject.currentTarget.winControl
    const index = listView.selection.getIndices()
    const itemSelected = []

    for (const item of index) {
      itemSelected.push(itemList.getItem(item).data)
    }
    changeSelectedItems(itemSelected)

    if (index.length === 1 && !selectionMode) {
      history.push(`${publicURL}/app/invitations/${itemSelected[0]['PluginFlyvemdmInvitation.id']}`)
    }
  }

  /**
   * Get invitations information and reload the list
   * @function handleRefresh
   * @async
   */
  handleRefresh = async () => {
    const {
      glpi,
      handleMessage,
      setNotification,
      history,
    } = this.props
    const {
      order,
      pagination,
    } = this.state

    try {
      history.push(`${publicURL}/app/invitations`)
      this.setState({
        isLoading: true,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const invitations = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        options: {
          uid_cols: true,
          forcedisplay: [1, 2, 3],
          order,
          range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
        },
      })
      this.setState({
        isLoading: false,
        order: invitations.order,
        itemList: BuildItemList(invitations, 2),
        totalcount: invitations.totalcount,
      })
    } catch (e) {
      handleMessage({
        notification: setNotification,
        error: e,
        type: 'alert',
      })
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * Delete invitatios
   * @function handleDelete
   * @async
   */
  handleDelete = async () => {
    const {
      selectedItems,
      glpi,
      setNotification,
      changeSelectionMode,
      changeSelectedItems,
      changeAction,
      handleMessage,
    } = this.props

    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        const itemListToDelete = selectedItems.map(item => ({
          id: item['PluginFlyvemdmInvitation.id'],
        }))

        this.setState({
          isLoading: true,
        }, async () => {
          await glpi.deleteItem({
            itemtype: itemtype.PluginFlyvemdmInvitation,
            input: itemListToDelete,
            queryString: {
              force_purge: true,
            },
          })

          setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.elements_successfully_removed'),
            type: 'success',
          })
          changeSelectionMode(false)
          changeSelectedItems([])
          changeAction('reload')
        })
      } else {
        // Exit selection mode
        changeSelectionMode(false)
        changeSelectedItems([])

        if (this.listView) {
          this.listView.winControl.selection.clear()
        }
      }
    } catch (error) {
      setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
      changeSelectionMode(false)
      changeSelectedItems([])

      this.setState(() => ({
        isLoading: false,
      }))
    }
  }

  /**
   * Change the order of the elements
   * @function handleSort
   * @async
   */
  handleSort = async () => {
    const { order } = this.state
    const {
      glpi,
      history,
    } = this.props

    try {
      this.setState({
        isLoading: true,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const newOrder = order === 'ASC' ? 'DESC' : 'ASC'

      const invitations = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [1, 2, 3],
        },
      })

      this.setState({
        isLoading: false,
        order: invitations.order,
        totalcount: invitations.totalcount,
        itemList: BuildItemList(invitations, 2),
      })
      history.push(`${publicURL}/app/invitations`)
    } catch (error) {
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * Resend invitations
   * @function handleResendEmail
   * @async
   */
  handleResendEmail = async () => {
    const {
      selectedItems,
      glpi,
      setNotification,
      handleMessage,
    } = this.props

    try {
      this.setState({
        isLoading: true,
      })
      const itemListToSend = selectedItems.map(item => ({
        id: item['PluginFlyvemdmInvitation.id'],
        _notify: item['PluginFlyvemdmInvitation.User.name'],
      }))
      await glpi.updateItem({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        input: itemListToSend,
      })
      setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.invitation_successfully_sent'),
        type: 'success',
      })
      this.handleToggleSelectionMode()
      this.setState({
        isLoading: false,
      })
    } catch (error) {
      setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
      this.handleToggleSelectionMode()
      this.setState({
        isLoading: false,
      })
    }
  }

  /**
   * Load more data
   * @function loadMoreData
   * @async
   */
  loadMoreData = async () => {
    const {
      itemList,
      pagination,
      totalcount,
      order,
    } = this.state
    const {
      glpi,
    } = this.props

    try {
      this.setState({
        isLoadingMore: true,
      })
      const range = {
        from: pagination.count * pagination.page,
        to: (pagination.count * (pagination.page + 1)) - 1,
      }
      if (range.from <= totalcount) {
        for (const key in range) {
          if (Object.prototype.hasOwnProperty.call(range, key)) {
            if (range[key] >= totalcount) { range[key] = totalcount - 1 }
          }
        }
        const invitations = await glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmInvitation,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3],
            order,
            range: `${range.from}-${range.to}`,
          },
        })

        for (const item in invitations.data) {
          if (Object.prototype.hasOwnProperty.call(invitations.data, item)) {
            itemList.push(invitations.data[item])
          }
        }

        this.setState({
          isLoadingMore: false,
          totalcount: invitations.totalcount,
          pagination: {
            ...pagination,
            page: pagination.page + 1,
          },
        })
      }
    } catch (error) {
      this.setState({
        isLoadingMore: false,
      })
    }
  }

  /**
   * Open page to create a new invitation
   * @function handleAdd
   */
  handleAdd = () => {
    const {
      history,
      changeSelectionMode,
      changeSelectedItems,
    } = this.props

    history.push(`${publicURL}/app/invitations/add`)
    changeSelectionMode(false)
    changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
    const {
      selectedItems,
      selectionMode,
      icon,
    } = this.props
    const {
      isLoadingMore,
      isLoading,
      itemList,
      layout,
    } = this.state

    const deleteCommand = (
      <ReactWinJS.ToolBar.Button
        key="delete"
        icon="delete"
        label={I18n.t('commons.dalete')}
        priority={0}
        disabled={selectedItems.length === 0}
        onClick={this.handleDelete}
      />
    )

    const resendCommand = (
      <ReactWinJS.ToolBar.Button
        key="mail"
        icon="mail"
        label={I18n.t('commons.resend_email')}
        priority={0}
        disabled={selectedItems.length === 0}
        onClick={this.handleResendEmail}
      />
    )

    const footerComponent = isLoadingMore
      ? <Loader />
      : (
        <div
          onClick={this.loadMoreData}
          style={{ cursor: 'pointer', color: '#158784' }}
          role="button"
          tabIndex="0"
        >
          <span
            className="refreshIcon"
            style={{ padding: '10px', fontSize: '20px' }}
          />
          <span>
            {I18n.t('commons.load_more')}
          </span>
        </div>
      )

    let listComponent

    if (isLoading) {
      listComponent = <Loader count={3} />
    } else if (itemList !== undefined) {
      if (itemList.length > 0) {
        listComponent = (
          <ReactWinJS.ListView
            ref={(listView) => { this.listView = listView }}
            className="list-pane__content win-selectionstylefilled"
            style={{ height: 'calc(100% - 48px)' }}
            itemDataSource={itemList.dataSource}
            groupDataSource={itemList.groups.dataSource}
            layout={layout}
            itemTemplate={this.ItemListRenderer}
            groupHeaderTemplate={this.groupHeaderRenderer}
            footerComponent={footerComponent}
            selectionMode={selectionMode ? 'multi' : 'single'}
            tapBehavior={selectionMode ? 'toggleSelect' : 'directSelect'}
            onSelectionChanged={this.handleSelectionChanged}
          />
        )
      } else {
        listComponent = <EmptyMessage message={I18n.t('invitations.not_found')} icon={icon} showIcon />
      }
    } else {
      listComponent = <EmptyMessage message={I18n.t('invitations.not_found')} icon={icon} showIcon />
    }

    return (
      <React.Fragment>
        <ReactWinJS.ToolBar ref={(toolBar) => { this.toolBar = toolBar }} className="listToolBar">
          <ReactWinJS.ToolBar.Button
            key="sort"
            icon="sort"
            label={I18n.t('commons.sort')}
            priority={1}
            onClick={this.handleSort}
          />
          <ReactWinJS.ToolBar.Button
            key="refresh"
            icon="refresh"
            label={I18n.t('commons.refresh')}
            priority={1}
            onClick={this.handleRefresh}
          />

          <ReactWinJS.ToolBar.Button
            key="add"
            icon="add"
            label={I18n.t('commons.add')}
            priority={0}
            onClick={this.handleAdd}
          />

          {selectionMode ? resendCommand : null}
          {selectionMode ? deleteCommand : null}

          <ReactWinJS.ToolBar.Toggle
            key="select"
            icon="bullets"
            label={I18n.t('commons.select')}
            priority={0}
            selected={selectionMode}
            onClick={this.handleToggleSelectionMode}
          />
        </ReactWinJS.ToolBar>

        { listComponent }
        <Confirmation
          title={I18n.t('invitations.delete')}
          message={`${selectedItems.length} ${I18n.t('commons.invitations')}`}
          reference={(el) => { this.contentDialog = el }}
        />
      </React.Fragment>
    )
  }
}

InvitationsList.defaultProps = {
  icon: null,
  action: null,
}

InvitationsList.propTypes = {
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  icon: PropTypes.string,
}
