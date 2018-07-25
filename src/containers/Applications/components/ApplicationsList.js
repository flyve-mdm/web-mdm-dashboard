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
import publicURL from 'shared/publicURL'
import handleMessage from 'shared/handleMessage'
import Loader from 'components/Loader'
import Confirmation from 'components/Confirmation'
import EmptyMessage from 'components/EmptyMessage'
import ApplicationsItemList from './ApplicationsItemList'

/**
 * @class ApplicationsList
 * @extends PureComponent
 */
export default class ApplicationsList extends PureComponent {
  /** Item list render */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <ApplicationsItemList
      itemList={ItemList.data}
      size={42}
    />
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

  /**
   * Clean the selection mode
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    const { changeSelectionMode } = this.props

    changeSelectionMode(false)
  }

  /**
   * handle fetch applications
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    const {
      glpi,
      history,
    } = this.props
    const {
      order,
      pagination,
    } = this.state

    try {
      history.push(`${publicURL}/app/applications`)
      this.setState({
        isLoading: true,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const response = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
        options: {
          uid_cols: true,
          forcedisplay: [1, 2, 3, 4, 5, 6],
          order,
          range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
        },
      })
      this.setState({
        isLoading: false,
        order: response.order,
        itemList: new WinJS.Binding.List(response.data),
        totalcount: response.totalcount,
      })
    } catch (error) {
      handleMessage({ message: error })
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * handle edit selected application
   * @function handleEdit
   */
  handleEdit = () => {
    const { history } = this.props

    const location = `${history.location.pathname}/edit`
    history.push(location)
  }

  /**
   * handle add new application
   * @function handleAdd
   */
  handleAdd = () => {
    const {
      history,
      changeSelectionMode,
      changeSelectedItems,
    } = this.props

    history.push(`${publicURL}/app/applications/add`)
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

    history.push(`${publicURL}/app/applications`)
    changeSelectionMode(!selectionMode)
    changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle show datail selected application
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
      history.push(`${publicURL}/app/applications/${itemSelected[0]['PluginFlyvemdmPackage.id']}`)
    }

    if (index.length > 1 && !selectionMode) {
      history.push(`${publicURL}/app/applications/edit/`)
    }
  }

  /**
   * handle delete selected application
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleDelete = async () => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        const itemListToDelete = this.props.selectedItems.map(item => ({
          id: item['PluginFlyvemdmPackage.id'],
        }))

        this.setState({
          isLoading: true,
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmPackage,
          input: itemListToDelete,
          queryString: {
            force_purge: true,
          },
        })

        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.applications_successfully_removed'),
          type: 'success',
        })
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        this.props.changeAction('reload')
      } else {
        // Exit selection mode
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])

        this.listView.winControl.selection.clear()
      }
    } catch (error) {
      this.props.toast.setNotification(handleMessage({
        type: 'alert',
        message: error,
      }))
      this.props.changeSelectionMode(false)
      this.props.changeSelectedItems([])

      this.setState(() => ({
        isLoading: false,
      }))
    }
  }

  /**
   * handle sort item list applications
   * @async
   * @function handleSort
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

      const response = await glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [1, 2, 3, 4, 5, 6],
        },
      })

      this.setState({
        isLoading: false,
        order: response.order,
        totalcount: response.totalcount,
        itemList: new WinJS.Binding.List(response.data),
      })

      history.push(`${publicURL}/app/applications`)
    } catch (error) {
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * handle load more data
   * @async
   * @function loadMoreData
   * @param {object} eventObject
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
        const response = await glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmPackage,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3, 4, 5, 6],
            order,
            range: `${range.from}-${range.to}`,
          },
        })

        for (const item in response.data) {
          if (Object.prototype.hasOwnProperty.call(response.data, item)) {
            itemList.push(response.data[item])
          }
        }

        this.setState({
          isLoadingMore: false,
          totalcount: response.totalcount,
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
   * handle add new application
   * @function handleAdd
   */
  handleAdd = () => {
    this.props.history.push(`${publicURL}/app/applications/add`)
    this.props.changeSelectionMode(false)
    this.props.changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  render() {
    const {
      layout,
      isLoadingMore,
      isLoading,
      itemList,
    } = this.state

    const deleteCommand = (
      <ReactWinJS.ToolBar.Button
        key="delete"
        icon="delete"
        label={I18n.t('commons.delete')}
        priority={0}
        disabled={this.props.selectedItems.length === 0}
        onClick={this.handleDelete}
      />
    )

    const editCommand = (
      <ReactWinJS.ToolBar.Button
        key="edit"
        icon="edit"
        label={I18n.t('commons.edit')}
        priority={0}
        disabled={this.props.selectedItems.length === 0}
        onClick={this.handleEdit}
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
    } else if (this.state.itemList && this.state.itemList.length > 0) {
      listComponent = (
        <ReactWinJS.ListView
          ref={(listView) => { this.listView = listView }}
          className="list-pane__content win-selectionstylefilled"
          style={{ height: 'calc(100% - 48px)' }}
          itemDataSource={itemList.dataSource}
          layout={layout}
          itemTemplate={this.ItemListRenderer}
          footerComponent={footerComponent}
          selectionMode={this.props.selectionMode ? 'multi' : 'single'}
          tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
          onSelectionChanged={this.handleSelectionChanged}
        />
      )
    } else {
      listComponent = (
        <EmptyMessage
          message={I18n.t('applications.not_found')}
          icon={this.props.icon}
          showIcon
        />
      )
    }

    return (
      <React.Fragment>
        <ReactWinJS.ToolBar
          ref={(toolBar) => { this.toolBar = toolBar }}
          className="listToolBar"
        >
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

          {this.props.selectionMode ? editCommand : null}
          {this.props.selectionMode ? deleteCommand : null}

          <ReactWinJS.ToolBar.Toggle
            key="select"
            icon="bullets"
            label={I18n.t('commons.select')}
            priority={0}
            selected={this.props.selectionMode}
            onClick={this.handleToggleSelectionMode}
          />
        </ReactWinJS.ToolBar>

        {listComponent}
        <Confirmation
          title={I18n.t('applications.delete')}
          message={`${this.props.selectedItems.length} ${I18n.t('applications.title')}`}
          reference={(el) => { this.contentDialog = el }}
        />
      </React.Fragment>
    )
  }
}
ApplicationsList.defaultProps = {
  action: null,
}

/** ApplicationsList propTypes */
ApplicationsList.propTypes = {
  history: PropTypes.object.isRequired,
  selectionMode: PropTypes.bool.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
}
