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
} from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import ApplicationsItemList from './ApplicationsItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import {
  I18n
} from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

/**
 * @class ApplicationsList
 * @extends PureComponent
 */
export default class ApplicationsList extends PureComponent {
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

  componentDidMount() {
    this.handleRefresh()
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
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

  componentWillUnmount() {
    this.props.changeSelectionMode(false)
  }

  /** Item list render */
  ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
    return ( <
      ApplicationsItemList itemList = {
        ItemList.data
      }
      size = {
        42
      }
      />
    )
  })

  /**
   * handle fetch applications
   * @async
   * @function handleRefresh
   */
  handleRefresh = async () => {
    try {
      this.props.history.push(`${publicURL}/app/applications`)
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
      const response = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
        options: {
          uid_cols: true,
          forcedisplay: [1, 2, 3, 4, 5, 6],
          order: this.state.order,
          range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}`
        }
      })
      this.setState({
        isLoading: false,
        order: response.order,
        itemList: new WinJS.Binding.List(response.data),
        totalcount: response.totalcount
      })

    } catch (error) {
      this.setState({
        isLoading: false,
        order: "ASC"
      })
    }
  }

  /**
   * handle edit selected application
   * @function handleEdit
   */
  handleEdit = () => {
    const location = `${this.props.history.location.pathname}/edit`
    this.props.history.push(location)
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

  /**
   * handle change selection mode
   * @function handleToggleSelectionMode
   */
  handleToggleSelectionMode = () => {
    this.props.history.push(`${publicURL}/app/applications`)
    this.props.changeSelectionMode(!this.props.selectionMode)
    this.props.changeSelectedItems([])
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
    let listView = eventObject.currentTarget.winControl
    let index = listView.selection.getIndices()
    let itemSelected = []

    for (const item of index) {
      itemSelected.push(this.state.itemList.getItem(item).data)
    }
    this.props.changeSelectedItems(itemSelected)
    if (index.length === 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/applications/${itemSelected[0]["PluginFlyvemdmPackage.id"]}`)
    }
    if (index.length > 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/applications/edit/`)
    }
  }

  /**
   * handle delete selected application
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleDelete = async (eventObject) => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {

        let itemListToDelete = this.props.selectedItems.map((item) => {
          return {
            id: item["PluginFlyvemdmPackage.id"]
          }
        })

        this.setState({
          isLoading: true
        })

        await this.props.glpi.deleteItem({
          itemtype: itemtype.PluginFlyvemdmPackage,
          input: itemListToDelete,
          queryString: {
            force_purge: true
          }
        })

        this.props.setNotification({
          title: I18n.t('commons.success'),
          body: I18n.t('notifications.applications_successfully_removed'),
          type: 'success'
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
   * handle sort item list applications
   * @async
   * @function handleSort
   */
  handleSort = async () => {
    try {
      this.setState({
        isLoading: true,
        pagination: {
          start: 0,
          page: 1,
          count: 15
        }
      })
      let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

      const response = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmPackage,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [1, 2, 3, 4, 5, 6]
        }
      })

      this.setState({
        isLoading: false,
        order: response.order,
        totalcount: response.totalcount,
        itemList: new WinJS.Binding.List(response.data)
      })
      this.props.history.push(`${publicURL}/app/applications`)

    } catch (error) {
      this.setState({
        isLoading: false,
        order: "ASC"
      })
    }
  }

  /**
   * handle change loading state
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
   * handle load more data
   * @async
   * @function loadMoreData
   * @param {object} eventObject
   */
  loadMoreData = async () => {
    try {
      this.setState({
        isLoadingMore: true
      })
      let range = {
        from: this.state.pagination.count * this.state.pagination.page,
        to: (this.state.pagination.count * (this.state.pagination.page + 1)) - 1
      }

      if (range.from <= this.state.totalcount) {
        for (const key in range) {
          if (range.hasOwnProperty(key)) {
            if (range[key] >= this.state.totalcount)
              range[key] = this.state.totalcount - 1
          }
        }
        const response = await this.props.glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmPackage,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3, 4, 5, 6],
            order: this.state.order,
            range: `${range.from}-${range.to}`
          }
        })

        for (const item in response.data) {
          this.state.itemList.push(response.data[item])
        }

        this.setState({
          isLoadingMore: false,
          totalcount: response.totalcount,
          pagination: {
            ...this.state.pagination,
            page: this.state.pagination.page + 1
          }
        })
      }

    } catch (error) {
      this.setState({
        isLoadingMore: false
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
    let deleteCommand = (
      <ReactWinJS.ToolBar.Button
        key="delete"
        icon="delete"
        label={I18n.t('commons.edelete')}
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
          <span>{I18n.t('commons.load_more')}</span>
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
        listComponent = (
          <EmptyMessage
            message={I18n.t('applications.not_found')}
            icon={this.props.icon}
            showIcon={true}
          />
        )
      }
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
          reference={el => this.contentDialog = el}
        />
      </React.Fragment>
    )
  }
}
/** ApplicationsList propTypes */
ApplicationsList.propTypes = {
  history: PropTypes.object.isRequired,
  selectionMode: PropTypes.bool.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired
}
