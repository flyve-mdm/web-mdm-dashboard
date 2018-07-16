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
import FilesItemList from './FilesItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'
import handleMessage from '../../../shared/handleMessage'

/**
 * @class FilesList
 * @extends PureComponent
 */
class FilesList extends PureComponent {
  /** Item list render */
  ItemListRenderer = ReactWinJS.reactRenderer(ItemList => (
    <FilesItemList
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
    if (this.listView) {
      this.listView.winControl.footer.style.outline = 'none'
      this.listView.winControl.footer.style.height = this.state.totalcount > (this.state.pagination.page * this.state.pagination.count) ? this.state.isLoadingMore ? '100px' : '42px' : '1px'
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

  /**
   * handle fetch files
   * @async
   * @function handleRefresh
   */
  handleRefresh = () => {
    this.props.history.push(`${publicURL}/app/files`)
    this.setState({
      isLoading: true,
      totalcount: 0,
      pagination: {
        start: 0,
        page: 1,
        count: 15,
      },
    }, async () => {
      try {
        const { order, pagination } = this.state
        const files = await this.props.glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmFile,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3],
            order,
            range: `${pagination.start}-${(pagination.count * pagination.page) - 1}`,
          },
        })
        this.setState({
          order: files.order,
          itemList: new WinJS.Binding.List(files.data),
          isLoading: false,
          totalcount: files.totalcount,
        })
      } catch (error) {
        handleMessage({ message: error })
        this.setState({
          isLoading: false,
          order: 'ASC',
        })
      }
    })
  }

  /**
   * handle edit selected files
   * @function handleEdit
   */
  handleEdit = () => {
    const path = `${publicURL}/app/files/edit`
    this.props.history.push(path)
  }

  /**
   * handle add new files
   * @function handleAdd
   */
  handleAdd = () => {
    this.props.history.push(`${publicURL}/app/files/add`)
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
    this.props.history.push(`${publicURL}/app/files`)
    this.props.changeSelectionMode(!this.props.selectionMode)
    this.props.changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
    }
  }

  /**
   * handle show datail selected files
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
      this.props.history.push(`${publicURL}/app/files/${itemSelected[0]['PluginFlyvemdmFile.id']}`)
    }
    if (index.length > 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/files/edit/`)
    }
  }

  /**
   * handle delete selected files
   * @function handleSelectionChanged
   * @param {object} eventObject
   */
  handleDelete = async () => {
    const isOK = await Confirmation.isOK(this.contentDialog)
    if (isOK) {
      const itemListToDelete = this.props.selectedItems.map(item => ({
        id: item['PluginFlyvemdmFile.id'],
      }))

      this.setState({
        isLoading: true,
      }, async () => {
        try {
          await this.props.glpi.deleteItem({
            itemtype: itemtype.PluginFlyvemdmFile,
            input: itemListToDelete,
            queryString: {
              force_purge: true,
            },
          })

          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.device_successfully_removed'),
            type: 'success',
          })
          this.props.changeSelectionMode(false)
          this.props.changeSelectedItems([])
          this.props.changeAction('reload')
        } catch (error) {
          this.props.toast.setNotification(handleMessage({
            type: 'alert',
            message: error,
          }))
          this.props.changeSelectionMode(false)
          this.props.changeSelectedItems([])
          this.setState({
            isLoading: false,
          })
        }
      })
    } else {
      this.props.changeSelectionMode(false)
      this.props.changeSelectedItems([])
      if (this.listView) {
        this.listView.winControl.selection.clear()
      }
    }
  }

  /**
   * handle sort item list files
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
          count: 15,
        },
      })
      const newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

      const files = await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmFile,
        options: {
          uid_cols: true,
          order: newOrder,
          forcedisplay: [1, 2, 3],
        },
      })

      this.setState({
        isLoading: false,
        order: files.order,
        totalcount: files.totalcount,
        itemList: new WinJS.Binding.List(files.data),
      })
      this.props.history.push(`${publicURL}/app/files`)
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
    try {
      this.setState({
        isLoadingMore: true,
      })
      const range = {
        from: this.state.pagination.count * this.state.pagination.page,
        to: (this.state.pagination.count * (this.state.pagination.page + 1)) - 1,
      }
      if (range.from <= this.state.totalcount) {
        for (const key in range) {
          if (Object.prototype.hasOwnProperty.call(range, key)) {
            if (range[key] >= this.state.totalcount) { range[key] = this.state.totalcount - 1 }
          }
        }
        const { order, pagination } = this.state
        const files = await this.props.glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmFile,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3],
            order,
            range: `${range.from}-${range.to}`,
          },
        })
        for (const item in files.data) {
          if (Object.prototype.hasOwnProperty.call(files.data, item)) {
            this.state.itemList.push(files.data[item])
          }
        }

        this.setState({
          isLoadingMore: false,
          totalcount: files.totalcount,
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
      listComponent = (
        <EmptyMessage
          message={I18n.t('files.not_found')}
          icon={this.props.icon}
          showIcon
        />
      )
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

        { listComponent }

        <Confirmation
          title={I18n.t('files.delete')}
          message={`${this.props.selectedItems.length} ${I18n.t('files.delete_message')}`}
          reference={(el) => { this.contentDialog = el }}
        />
      </React.Fragment>
    )
  }
}
FilesList.defaultProps = {
  action: null,
}

/** FilesList propTypes */
FilesList.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  toast: PropTypes.object.isRequired,
  glpi: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
}

export default FilesList
