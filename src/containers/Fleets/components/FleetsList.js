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
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import I18n from 'shared/i18n'
import itemtype from 'shared/itemtype'
import publicURL from 'shared/publicURL'
import handleMessage from 'shared/handleMessage'
import Loader from 'components/Loader'
import Confirmation from 'components/Confirmation'
import EmptyMessage from 'components/EmptyMessage'
import FleetsItemList from './FleetsItemList'

/**
 * @class FleetsList
 * @extends PureComponent
 */
export default class FleetsList extends PureComponent {
  /**
   * Get render item list
   * @constant ItemListRenderer
   * @type {component}
   */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <FleetsItemList
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

  /**
   * Refresh fleets list
   * @function componentDidMount
   */
  componentDidMount() {
    this.handleRefresh()
  }

  /**
   * Setup Listview
   * @function componentDidUpdate
   * @param {object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.listView) {
      this.listView.winControl.footer.style.outline = 'none'
      this.listView.winControl.footer.style.height = this.state.totalcount > (this.state.pagination.page * this.state.pagination.count) ? this.state.isLoadingMore ? '100px' : '42px' : '1px'
    }
    if (this.toolBar) {
      this.toolBar.winControl.forceLayout()
    }

    if (this.props.action === 'reload') {
      this.handleRefresh()
      this.props.changeAction(null)
    }

    if (prevProps.selectedItems.length > 0 && this.props.selectedItems.length === 0 && !this.props.selectionMode) {
      if (this.listView) {
        this.listView.winControl.selection.clear()
      }
    }
  }

  /**
   * Disable selection when component is unmount
   * @function componentWillUnmount
   */
  componentWillUnmount() {
    this.props.changeSelectionMode(false)
  }

  /**
   * Go to add new fleet
   * @function handleAdd
   */
  handleAdd = () => {
    this.props.changeSelectedItems([])
    this.props.changeSelectionMode(false)
    this.props.history.push(`${publicURL}/app/fleets/add`)

    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle change selection mode
   * @function handleToggleSelectionMode
   */
  handleToggleSelectionMode = () => {
    this.props.history.push(`${publicURL}/app/fleets`)
    this.props.changeSelectionMode(!this.props.selectionMode)
    this.props.changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle selection changed
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleSelectionChanged = (eventObject) => {
    const listView = eventObject.currentTarget.winControl
    const index = listView.selection.getIndices()
    const itemSelected = []

    for (const item of index) {
      itemSelected.push(this.state.itemList.getItem(item).data)
    }
    this.props.changeSelectedItems(itemSelected)
    if (index.length === 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/fleets/${itemSelected[0]['PluginFlyvemdmFleet.id']}`)
    }
    if (index.length > 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/fleets/edit/`)
    }
  }

  /**
   * handle remove fleets from list
   * @function handleDelete
   * @async
   */
  handleDelete = async () => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        const itemListToDelete = this.props.selectedItems.map(item => ({
          id: item['PluginFlyvemdmFleet.id'],
        }))

        this.setState({
          isLoading: true,
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmFleet,
          input: itemListToDelete,
          queryString: {
            force_purge: true,
          },
        })

        this.props.toast.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.fleet_successfully_removed'),
          type: 'success',
        })
        this.props.changeAction('reload')
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
      } else {
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        if (this.listView) {
          this.listView.winControl.selection.clear()
        }
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
   * handle sort fleets list
   * @function handleSort
   * @async
   */
  handleSort = async () => {
    try {
      this.setState({
        isLoading: true,
      })
      const { order, pagination } = this.state
      const newOrder = order === 'ASC' ? 'DESC' : 'ASC'

      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          forcedisplay: [2],
          order: newOrder,
          range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
        },
      })
      this.setState({
        isLoading: false,
        order: fleets.order,
        totalcount: fleets.totalcount,
        itemList: new WinJS.Binding.List(fleets.data),
      })
      this.props.history.push(`${publicURL}/app/fleets`)
    } catch (error) {
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * @function loadMoreData
   * @async
   */
  loadMoreData = async () => {
    try {
      this.setState({
        isLoadingMore: true,
      })

      const range = {
        from: this.state.pagination.count * this.state.pagination.page,
        to: (this.state.pagination.count * (this.state.pagination.page + 1)) - 1,
      }
      const { order, pagination } = this.state
      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          order,
          forcedisplay: [2],
          range: `${range.from}-${range.to}`,
        },
      })

      for (const item in fleets.data) {
        if (Object.prototype.hasOwnProperty.call(fleets.data, item)) {
          this.state.itemList.push(fleets.data[item])
        }
      }
      this.setState({
        isLoadingMore: false,
        totalcount: fleets.totalcount,
        pagination: {
          ...pagination,
          page: pagination.page + 1,
        },
      })
    } catch (error) {
      this.setState({
        isLoadingMore: false,
      })
    }
  }

  /**
   * Go to Edit fleet
   * @function handleEdit
   */
  handleEdit = () => {
    this.props.history.push(`${publicURL}/app/fleets/edit`)
  }

  /**
   * handle refresh fleets in list
   * @function handleRefresh
   * @async
   */
  handleRefresh = async () => {
    try {
      this.props.history.push(`${publicURL}/app/fleets`)
      this.setState({
        isLoading: true,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      const { order, pagination } = this.state
      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          forcedisplay: [2],
          order,
          range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
        },
      })
      this.setState({
        isLoading: false,
        order: fleets.order,
        totalcount: fleets.totalcount,
        itemList: new WinJS.Binding.List(fleets.data),
      })
    } catch (error) {
      handleMessage({ message: error })
      this.props.toast.setNotification(handleMessage({
        type: 'alert',
        error,
      }))
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
    }
  }

  /**
   * Render component
   * @function render
   */
  render() {
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

    const footerComponent = this.state.isLoadingMore
      ? <Loader />
      : (
        <div
          onClick={this.loadMoreData}
          style={{ cursor: 'pointer', color: '#158784' }}
          role="button"
          tabIndex="0"
        >
          <Icon
            iconName="Refresh"
            style={{ padding: '10px', fontSize: '20px' }}
          />
          <span>
            {I18n.t('commons.load_more')}
          </span>
        </div>
      )

    let listComponent

    if (this.state.isLoading) {
      listComponent = <Loader count={3} />
    } else if (this.state.itemList && this.state.itemList.length > 0) {
      listComponent = (
        <ReactWinJS.ListView
          ref={(listView) => { this.listView = listView }}
          className="list-pane__content win-selectionstylefilled"
          style={{ height: 'calc(100% - 48px)' }}
          itemDataSource={this.state.itemList.dataSource}
          layout={this.state.layout}
          itemTemplate={this.ItemListRenderer}
          footerComponent={footerComponent}
          selectionMode={this.props.selectionMode ? 'multi' : 'single'}
          tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
          onSelectionChanged={this.handleSelectionChanged}
        />
      )
    } else {
      listComponent = <EmptyMessage message={I18n.t('fleets.not_found')} icon={this.props.icon} showIcon />
    }

    return (
      <React.Fragment>
        <ReactWinJS.ToolBar ref={(toolBar) => { this.toolBar = toolBar }} className="listToolBar">
          <ReactWinJS.ToolBar.Button
            key="sort"
            icon="sort"
            label={I18n.t('commons.sort')}
            path="/"
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
          title={I18n.t('fleets.delete')}
          message={`${this.props.selectedItems.length} ${I18n.t('commons.fleets')}`}
          reference={(el) => { this.contentDialog = el }}
        />
      </React.Fragment>
    )
  }
}

FleetsList.defaultProps = {
  action: null,
}

FleetsList.propTypes = {
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
}
