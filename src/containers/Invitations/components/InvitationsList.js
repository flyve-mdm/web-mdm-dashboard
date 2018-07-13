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
import InvitationsItemList from './InvitationsItemList'
import BuildItemList from '../../../shared/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'
import handleMessage from '../../../shared/handleMessage'

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
    if (this.listView) {
      this.listView.winControl.footer.style.outline = 'none'
      this.listView.winControl.footer.style.height = this.state.totalcount > (this.state.pagination.page * this.state.pagination.count)
        ? this.state.isLoadingMore
          ? '100px'
          : '42px'
        : '1px'
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
   * Clean the list
   * @constant componentWillUnmount
   */
  componentWillUnmount() {
    this.props.changeSelectionMode(false)
  }

  /**
   * Handle change selection mode
   * @function handleToggleSelectionMode
   */
  handleToggleSelectionMode = () => {
    this.props.history.push(`${publicURL}/app/invitations`)
    this.props.changeSelectionMode(!this.props.selectionMode)
    this.props.changeSelectedItems([])
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
    const listView = eventObject.currentTarget.winControl
    const index = listView.selection.getIndices()
    const itemSelected = []

    for (const item of index) {
      itemSelected.push(this.state.itemList.getItem(item).data)
    }
    this.props.changeSelectedItems(itemSelected)

    if (index.length === 1 && !this.props.selectionMode) {
      this.props.history.push(`${publicURL}/app/invitations/${itemSelected[0]['PluginFlyvemdmInvitation.id']}`)
    }
  }

  /**
   * Get invitations information and reload the list
   * @function handleRefresh
   * @async
   */
  handleRefresh = async () => {
    try {
      this.props.history.push(`${publicURL}/app/invitations`)
      this.setState({
        isLoading: true,
        totalcount: 0,
        pagination: {
          start: 0,
          page: 1,
          count: 15,
        },
      })
      await this.props.glpi.searchItems({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        options: {
          uid_cols: true,
          forcedisplay: [1, 2, 3],
          order: this.state.order,
          range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}`,
        },
      }, (invitations) => {
        this.setState({
          isLoading: false,
          order: invitations.order,
          itemList: BuildItemList(invitations, 2),
          totalcount: invitations.totalcount,
        })
      })
    } catch (error) {
      handleMessage({ message: error })
      this.setState({
        isLoading: false,
        order: 'ASC',
      })
      this.props.toast.setNotification(handleMessage({
        message: error,
        type: 'alert',
      }))
    }
  }

  /**
   * Delete invitatios
   * @function handleDelete
   * @async
   */
  handleDelete = async () => {
    try {
      const isOK = await Confirmation.isOK(this.contentDialog)
      if (isOK) {
        const itemListToDelete = this.props.selectedItems.map(item => ({
          id: item['PluginFlyvemdmInvitation.id'],
        }))

        this.setState({
          isLoading: true,
        }, async () => {
          await this.props.glpi.deleteItem({
            itemtype: itemtype.PluginFlyvemdmInvitation,
            input: itemListToDelete,
            queryString: {
              force_purge: true,
            },
          })

          this.props.toast.setNotification({
            title: I18n.t('commons.success'),
            body: I18n.t('notifications.elements_successfully_removed'),
            type: 'success',
          })
          this.props.changeSelectionMode(false)
          this.props.changeSelectedItems([])
          this.props.changeAction('reload')
        })
      } else {
        // Exit selection mode
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
   * Change the order of the elements
   * @function handleSort
   * @async
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

      const invitations = await this.props.glpi.searchItems({
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
      this.props.history.push(`${publicURL}/app/invitations`)
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
    try {
      this.setState({
        isLoading: true,
      })
      const itemListToSend = this.props.selectedItems.map(item => ({
        id: item['PluginFlyvemdmInvitation.id'],
        _notify: item['PluginFlyvemdmInvitation.User.name'],
      }))
      await this.props.glpi.updateItem({
        itemtype: itemtype.PluginFlyvemdmInvitation,
        input: itemListToSend,
      })
      this.props.toast.setNotification({
        title: I18n.t('commons.success'),
        body: I18n.t('notifications.invitation_successfully_sent'),
        type: 'success',
      })
      this.handleToggleSelectionMode()
      this.setState({
        isLoading: false,
      })
    } catch (error) {
      this.props.toast.setNotification(this.props.handleMessage({
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
        await this.props.glpi.searchItems({
          itemtype: itemtype.PluginFlyvemdmInvitation,
          options: {
            uid_cols: true,
            forcedisplay: [1, 2, 3],
            order: this.state.order,
            range: `${range.from}-${range.to}`,
          },
        }, (invitations) => {
          for (const item in invitations.data) {
            if (Object.prototype.hasOwnProperty.call(invitations.data, item)) {
              this.state.itemList.push(invitations.data[item])
            }
          }

          this.setState((prevState) => {
            ({
              isLoadingMore: false,
              totalcount: invitations.totalcount,
              pagination: {
                ...prevState.pagination,
                page: prevState.pagination.page + 1,
              },
            })
          })
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
    this.props.history.push(`${publicURL}/app/invitations/add`)
    this.props.changeSelectionMode(false)
    this.props.changeSelectedItems([])
    if (this.listView) {
      this.listView.winControl.selection.clear()
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

    const resendCommand = (
      <ReactWinJS.ToolBar.Button
        key="mail"
        icon="mail"
        label={I18n.t('commons.resend_email')}
        priority={0}
        disabled={this.props.selectedItems.length === 0}
        onClick={this.handleResendEmail}
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
    } else if (itemList && itemList.length > 0) {
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
          selectionMode={this.props.selectionMode ? 'multi' : 'single'}
          tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
          onSelectionChanged={this.handleSelectionChanged}
        />
      )
    } else {
      listComponent = <EmptyMessage message={I18n.t('invitations.not_found')} icon={this.props.icon} showIcon />
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

          {this.props.selectionMode ? resendCommand : null}
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
          title={I18n.t('invitations.delete')}
          message={`${this.props.selectedItems.length} ${I18n.t('commons.invitations')}`}
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
  toast: PropTypes.shape({
    setNotification: PropTypes.func,
  }).isRequired,
  handleMessage: PropTypes.func.isRequired,
  selectionMode: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  changeSelectionMode: PropTypes.func.isRequired,
  action: PropTypes.string,
  changeAction: PropTypes.func.isRequired,
  glpi: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  changeSelectedItems: PropTypes.func.isRequired,
  icon: PropTypes.string,
}
