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

import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import UsersItemList from './UsersItemList'
import BuildItemList from '../../../shared/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

export default class UsersList extends PureComponent {
    
    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItems: [],
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
    
    componentDidUpdate(prevProps) {    
        if(this.listView) {
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
            if(this.listView) {
                this.listView.winControl.selection.clear()
            }
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItems: [] })
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <UsersItemList itemList={ItemList.data}/>
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleToggleSelectionMode = () => {
        this.props.history.push(`${publicURL}/app/users`)
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.changeSelectedItems([])
        if (this.listView) {
            this.listView.winControl.selection.clear()
        }
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        let itemSelected = []

        for (const item of index) {
            itemSelected.push(this.state.itemList.getItem(item).data)
        }
        this.props.changeSelectedItems(itemSelected)
        if (index.length === 1 && !this.props.selectionMode) {
            this.props.history.push(`${publicURL}/app/users/${itemSelected[0]["User.id"]}`)
        }
        if (index.length > 1 && !this.props.selectionMode) {
            this.props.history.push(`${publicURL}/app/users/edit/`)
        }
    }

    handleRefresh = async () => {
        try {
            this.props.history.push(`${publicURL}/app/users`)
            this.setState({
                isLoading: true,
                scrolling: false,
                selectedItems: [],
                totalcount: 0,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            
            const response = await this.props.glpi.searchItems({ itemtype: itemtype.User, options: { uid_cols: true, forcedisplay: [1, 2, 5, 34, 150], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })        

            this.setState({
                isLoading: false,
                order: response.order,
                itemList: BuildItemList(response),
                totalcount: response.totalcount
            })
        } catch (e) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit = () => {
        const path = `${publicURL}/app/users/edit`
        this.props.history.push(path)
    }

    handleDelete = async (eventObject) => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            
            let itemListToDelete = this.props.selectedItems.map((item) => {
                return {
                    id: item["User.id"]
                }
            })
            
            this.setState({
                isLoading: true
            }, async () => {
                try {
                    await this.props.glpi.deleteItem({ itemtype: itemtype.User, input: itemListToDelete, queryString: { force_purge: true } })
    
                    this.props.setNotification({
                        title: I18n.t('commons.success'),
                        body: I18n.t('notifications.user_successfully_removed'),
                        type: 'success'
                    })
                    this.props.changeSelectionMode(false)
                    this.props.changeSelectedItems([])
                    this.props.changeAction('reload')
                } catch (error) {
                    this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
                    this.props.changeSelectionMode(false)
                    this.props.changeSelectedItems([])
                    if (this.listView) {
                        this.listView.winControl.selection.clear()
                    }
                    this.setState((prevState, props) => ({
                        isLoading: false
                    }))
                }
            })
        } else {
            this.props.changeSelectionMode(false)
            this.props.changeSelectedItems([])
            this.listView.winControl.selection.clear()
        }
    }

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

            const response = await this.props.glpi.searchItems({ itemtype: itemtype.User, options: { uid_cols: true, order: newOrder, forcedisplay: [1, 2, 5, 34, 150] } })

            this.setState({
                isLoading: false,
                order: response.order,
                totalcount: response.totalcount,
                itemList: BuildItemList(response)
            })
            this.props.history.push(`${publicURL}/app/users`)

        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    onLoadingStateChanged = (eventObject) => {
        if (eventObject.detail.scrolling === true) {
            setTimeout(() => {
                this.setState({scrolling: true})
            }, 0)
        }
    }

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
                const response = await this.props.glpi.searchItems({ itemtype: itemtype.User, options: { uid_cols: true, forcedisplay: [1, 2, 5, 34, 150], order: this.state.order, range: `${range.from}-${range.to}` } })
                
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
            <Loader /> : 
            (
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
            if (this.state.itemList) {
                if(this.state.itemList.length > 0) {
                    listComponent = (
                        <ReactWinJS.ListView
                            ref={(listView) => { this.listView = listView }}
                            onLoadingStateChanged={this.onLoadingStateChanged}
                            className="list-pane__content win-selectionstylefilled"
                            style={{ height: 'calc(100% - 48px)' }}
                            itemDataSource={this.state.itemList.dataSource}
                            groupDataSource={this.state.itemList.groups.dataSource}
                            layout={this.state.layout}
                            itemTemplate={this.ItemListRenderer}
                            groupHeaderTemplate={this.groupHeaderRenderer}
                            footerComponent={footerComponent}
                            selectionMode={this.props.selectionMode ? 'multi' : 'single'}
                            tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
                            onSelectionChanged={this.handleSelectionChanged}
                        />
                    )
                } else {
                    listComponent = <EmptyMessage message={I18n.t('users.not_found')} icon={this.props.icon} showIcon={true} />
                }
            } else {
                listComponent = <EmptyMessage message={I18n.t('users.not_found')} icon={this.props.icon} showIcon={true} />
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

                <Confirmation title={I18n.t('users.delete')} message={`${this.props.selectedItems.length} ${I18n.t('commons.users')}`} reference={el => this.contentDialog = el} /> 
            </React.Fragment>
        )
    }
}
UsersList.propTypes = {
    selectedItems: PropTypes.array.isRequired,
    changeSelectedItems: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
