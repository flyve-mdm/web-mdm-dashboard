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
import DevicesItemList from './DevicesItemList'
import BuildItemList from '../../../shared/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

/**
 * @class DevicesList
 * @extends PureComponent
 */
export default class DevicesList extends PureComponent {
  /**
   * handle item list render
   * @function ItemListRenderer
   */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <DevicesItemList itemList={ItemList.data} size={42} />
  ))

  /**
   * handle list header render
   * @function groupHeaderRenderer
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

  componentDidMount() {
    this.handleRefresh()
  }

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
      this.listView.winControl.footer.style.height = totalcount > (pagination.page * pagination.count) ? isLoadingMore ? '100px' : '42px' : '1px'
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

  componentWillUnmount() {
    const { changeSelectionMode } = this.props
    changeSelectionMode(false)
  }

  /**
   * handle load more data
   * @async
   * @function loadMoreData
   */
  loadMoreData = async () => {
    const {
      pagination,
      totalcount,
      order,
      itemList,
    } = this.state
    const { glpi } = this.props

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
        const devices = await glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmAgent,
          options: {
            uid_cols: true,
            forcedisplay: [2, 3, 4, 12],
            order,
            range: `${range.from}-${range.to}`,
          },
        })

        for (const item in devices.data) {
          if (Object.prototype.hasOwnProperty.call(devices.data, item)) {
            itemList.push(devices.data[item])
          }
        }

        this.setState({
          isLoadingMore: false,
          totalcount: devices.totalcount,
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
   * handle refresh devices list
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    try {
      const { glpi } = this.props
      const {
        order,
        pagination,
      } = this.state

      this.setState({
        isLoading: true,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const devices = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmAgent,
        options: {
          uid_cols: true,
          forcedisplay: [2, 3, 4, 12],
          order,
          range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
        },
      })
      this.setState({
        isLoading: false,
        order: devices.order,
        totalcount: devices.totalcount,
        itemList: BuildItemList(devices),
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * handle add new device
   * @function handleAdd
   */
  handleAdd = () => {
    const {
      history,
      changeSelectionMode,
      changeSelectedItems,
    } = this.props

    history.push(`${publicURL}/app/devices/add`)
    changeSelectionMode(false)
    changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle change selection mode
   * @function handleToggleSelectionMode
   */
  handleToggleSelectionMode = () => {
    const {
      history,
      changeSelectionMode,
      selectionMode,
      changeSelectedItems,
    } = this.props

    history.push(`${publicURL}/app/devices`)
    changeSelectionMode(!selectionMode)
    changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle change to selected device
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleSelectionChanged = (eventObject) => {
    const {
      changeSelectedItems,
      selectionMode,
      history,
    } = this.props
    const { itemList } = this.state

    const listView = eventObject.currentTarget.winControl
    const index = listView.selection.getIndices()
    const itemSelected = []

    for (const item of index) {
      itemSelected.push(itemList.getItem(item).data)
    }
    changeSelectedItems(itemSelected)
    if (index.length === 1 && !selectionMode) {
      history.push(`${publicURL}/app/devices/${itemSelected[0]['PluginFlyvemdmAgent.id']}`)
    }
    if (index.length > 1 && !selectionMode) {
      history.push(`${publicURL}/app/devices/edit/`)
    }
  }

  /**
   * handle delete to selected device
   * @function handleDelete
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
          id: item['PluginFlyvemdmAgent.id'],
        }))

        this.setState({
          isLoading: true,
        })

        await glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmAgent,
          input: itemListToDelete,
          queryString: {
            force_purge: true,
          },
        })

        setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.device_successfully_removed'),
          type: 'success',
        })
        changeSelectionMode(false)
        changeSelectedItems([])
        changeAction('reload')
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
   * @async
   * handle list sort
   * @function handleSort
   * @param {object} eventObject
   */
  handleSort = async () => {
    try {
      const { order } = this.state
      const { glpi } = this.props

      this.setState({
        isLoading: true,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const newOrder = order === 'ASC' ? 'DESC' : 'ASC'

      const devices = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmAgent,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [2, 3, 4, 12],
        },
      })

      this.setState({
        isLoading: false,
        order: devices.order,
        totalcount: devices.totalcount,
        itemList: BuildItemList(devices),
      })
    } catch (error) {
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * handle edit selected device
   * @function handleEdit
   */
  handleEdit() {
    const { history } = this.props

    history.push(`${publicURL}/app/devices/edit`)
  }

  render() {
    const {
      selectedItems,
      selectionMode,
      icon,
    } = this.props
    const {
      isLoadingMore,
      itemList,
      isLoading,
      layout,
    } = this.state

    const deleteCommand = (
      <ReactWinJS.ToolBar.Button
        key="delete"
        icon="delete"
        label={I18n.t('commons.delete')}
        priority={0}
        disabled={selectedItems.length === 0}
        onClick={this.handleDelete}
      />
    )

    const editCommand = (
      <ReactWinJS.ToolBar.Button
        key="edit"
        icon="edit"
        label={I18n.t('commons.edit')}
        priority={0}
        disabled={selectedItems.length === 0}
        onClick={e => this.handleEdit(e)}
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
    } else if (itemList) {
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
        listComponent = <EmptyMessage message={I18n.t('devices.not_found')} icon={icon} showIcon />
      }
    } else {
      listComponent = <EmptyMessage message={I18n.t('devices.not_found')} icon={icon} showIcon />
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
            priority={2}
            onClick={this.handleRefresh}
          />

          <ReactWinJS.ToolBar.Button
            key="add"
            icon="add"
            label={I18n.t('commons.add')}
            priority={0}
            onClick={this.handleAdd}
          />

          {selectionMode ? editCommand : null}
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
          title={I18n.t('devices.delete')}
          message={`${selectedItems.length} ${I18n.t('devices.title')}`}
          reference={(el) => { this.contentDialog = el }}
        />
      </React.Fragment>
    )
  }
}

DevicesList.defaultProps = {
  action: null,
}

/** DevicesList propTypes */
DevicesList.propTypes = {
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
}
