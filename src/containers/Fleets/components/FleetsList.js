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
  PureComponent
} from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import FleetsItemList from './FleetsItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import {
  I18n
} from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

/**
 * @class FleetsList
 * @extends PureComponent
 */
export default class FleetsList extends PureComponent {
  /** @constructor */
  constructor(props) {
    super(props)
    this.state = {
      layout: {
        type: WinJS.UI.ListLayout
      },
      scrolling: false,
      isLoading: false,
      isLoadingMore: false,
      itemList: new WinJS.Binding.List([]),
      order: "ASC",
      totalcount: 0,
      pagination: {
        start: 0,
        page: 1,
        count: 15
      }
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
      this.listView.winControl.footer.style.height = this.state.totalcount > (this.state.pagination.page * this.state
        .pagination.count) ? this.state.isLoadingMore ? '100px' : '42px' : '1px'
    }
    if (this.toolBar) {
      this.toolBar.winControl.forceLayout();
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
   * Get render item list
   * @constant ItemListRenderer
   * @type {component}
   */
  ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
    return ( <
      FleetsItemList itemList = {
        ItemList.data
      }
      size = {
        42
      }
      />
    )
  })

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
        scrolling: false,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15
        }
      })
      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          forcedisplay: [2],
          order: this.state.order,
          range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}`
        }
      })
      this.setState({
        isLoading: false,
        order: fleets.order,
        totalcount: fleets.totalcount,
        itemList: new WinJS.Binding.List(fleets.data)
      })


    } catch (error) {
      this.props.handleMessage({
        notification: this.props.setNotification,
        type: 'alert',
        error: error
      })
      this.setState({
        isLoading: false,
        order: "ASC"
      })
    }
  }

  /**
   * Go to add new fleet
   * @function handleAdd
   */
  handleAdd = () => {
    this.props.history.push(`${publicURL}/app/fleets/add`)
    this.props.changeSelectionMode(false)
    this.props.changeSelectedItems([])
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
    let listView = eventObject.currentTarget.winControl
    let index = listView.selection.getIndices()
    let itemSelected = []

    for (const item of index) {
      itemSelected.push(this.state.itemList.getItem(item).data)
    }
    this.props.changeSelectedItems(itemSelected)
    if (index.length === 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/fleets/${itemSelected[0]["PluginFlyvemdmFleet.id"]}`)
    }
    if (index.length > 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/fleets/edit/`)
    }
  }

  /**
   * handle remove fleets from list
   * @function handleDelete
   * @async
   * @param {object} eventObject
   */
  handleDelete = async (eventObject) => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {

        let itemListToDelete = this.props.selectedItems.map((item) => {
          return {
            id: item["PluginFlyvemdmFleet.id"]
          }
        })

        this.setState({
          isLoading: true
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmFleet,
          input: itemListToDelete,
          queryString: {
            force_purge: true
          }
        })

        this.props.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.fleet_successfully_removed'),
          type: 'success'
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
      this.props.setNotification(this.props.handleMessage({
        type: 'alert',
        message: error
      }))
      this.props.changeSelectionMode(false)
      this.props.changeSelectedItems([])

      this.setState((prevState, props) => ({
        isLoading: false
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
        isLoading: true
      })
      let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [2],
          range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}`
        }
      })

      this.setState({
        isLoading: false,
        order: fleets.order,
        totalcount: fleets.totalcount,
        itemList: new WinJS.Binding.List(fleets.data)
      })
      this.props.history.push(`${publicURL}/app/fleets`)

    } catch (error) {
      this.setState({
        isLoading: false,
        order: "ASC"
      })
    }
  }

  /**
   * @function onLoadingStateChanged
   * @param {object} eventObject
   */
  onLoadingStateChanged = (eventObject) => {
    if (eventObject.detail.scrolling === true) {
      setTimeout(() => {
        this.setState({
          scrolling: true
        })
      }, 0)
    }
  }

  /**
   * @function loadMoreData
   * @async
   */
  loadMoreData = async () => {
    try {
      this.setState({
        isLoadingMore: true
      })

      const range = {
        from: this.state.pagination.count * this.state.pagination.page,
        to: (this.state.pagination.count * (this.state.pagination.page + 1)) - 1
      }

      const fleets = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFleet,
        options: {
          uid_cols: true,
          forcedisplay: [2],
          order: this.state.order,
          range: `${range.from}-${range.to}`
        }
      })

      for (const item in fleets.data) {
        this.state.itemList.push(fleets.data[item])
      }

      this.setState({
        isLoadingMore: false,
        totalcount: fleets.totalcount,
        pagination: {
          ...this.state.pagination,
          page: this.state.pagination.page + 1
        }
      })

    } catch (error) {

      this.setState({
        isLoadingMore: false
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
   * Render component
   * @function render
   */
  render() {
    let deleteCommand = (
      <ReactWinJS.ToolBar.Button
        key="delete"
        icon="delete"
        label={I18n.t('commons.delete')}
        priority={0}
        disabled={this.props.selectedItems.length === 0}
        onClick={this.handleDelete}
      />
    )
    let editCommand = (
      <ReactWinJS.ToolBar.Button
        key="edit"
        icon="edit"
        label={I18n.t('commons.edit')}
        priority={0}
        disabled={this.props.selectedItems.length === 0}
        onClick={this.handleEdit}
      />
    )

    let footerComponent = this.state.isLoadingMore ?
      <Loader />
      : (
        <div onClick={this.loadMoreData} style={{ cursor: 'pointer', color:'#158784'}}>
          <span
            className="refreshIcon"
            style={{ padding: '10px', fontSize: '20px' }}
            onClick={this.loadMoreData}/>
          <span>
            {I18n.t('commons.load_more')}
          </span>
        </div>
      )

    let listComponent

    if (this.state.isLoading) {
      listComponent = <Loader count={3} />
    } else {
      if (this.state.itemList.length > 0) {
        listComponent = (
          <ReactWinJS.ListView
            ref={(listView) => { this.listView = listView }}
            onLoadingStateChanged={this.onLoadingStateChanged}
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
        listComponent = <EmptyMessage message={I18n.t('fleets.not_found')} icon={this.props.icon} showIcon={true} />
      }
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
          reference={el => this.contentDialog = el}
        />
      </React.Fragment>
    )
  }
}

FleetsList.propTypes = {
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired
}
