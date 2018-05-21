import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import DevicesItemList from './DevicesItemList'
import BuildItemList from '../../../components/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'
import EmptyMessage from '../../../components/EmptyMessage'
import { I18n } from 'react-i18nify'
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

export default class DevicesList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
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
        if(this.toolBar) {
            this.toolBar.winControl.forceLayout()
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
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <DevicesItemList itemList={ItemList.data} size={42} />
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleRefresh = async () => {
        try {
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
            const devices = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmAgent, options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
            this.setState({
                isLoading: false,
                order: devices.order,
                totalcount: devices.totalcount,
                itemList: BuildItemList(devices),
            })
            
        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit(eventObject) {
        this.props.history.push(`${publicURL}/app/devices/edit`)
    }

    handleAdd = () => {
        this.props.history.push(`${publicURL}/app/devices/add`)
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        if (this.listView) {
            this.listView.winControl.selection.clear()
        }
    }

    handleToggleSelectionMode = () => {
        this.props.history.push(`${publicURL}/app/devices`)
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
            this.props.history.push(`${publicURL}/app/devices/${itemSelected[0]["PluginFlyvemdmAgent.id"]}`)
        }
        if (index.length > 1 && !this.props.selectionMode) {
            this.props.history.push(`${publicURL}/app/devices/edit/`)
        }
    }

    handleDelete = async (eventObject) => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.props.selectedItems.map((item) => {
                    return {
                        id: item["PluginFlyvemdmAgent.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })

                await this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmAgent, input: itemListToDelete, queryString: { force_purge: true } })

                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.device_successfully_removed'),
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.changeSelectedItems([])
                this.props.changeAction('reload')
            } else {
                // Exit selection mode
                this.props.changeSelectionMode(false)
                this.props.changeSelectedItems([])

                if (this.listView) {
                    this.listView.winControl.selection.clear()
                }
            }
            
        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.props.changeSelectionMode(false)
            this.props.changeSelectedItems([])

            this.setState((prevState, props) => ({
                isLoading: false
            }))
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

            const devices = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmAgent, options: { uid_cols: true, order: newOrder, forcedisplay: [2, 3, 4, 12] } })

            this.setState({
                isLoading: false,
                order: devices.order,
                totalcount: devices.totalcount,
                itemList: BuildItemList(devices)
            })

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
                 this.setState({
                scrolling: true
            })
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
                const devices = await this.props.glpi.searchItems({ itemtype: itemtype.PluginFlyvemdmAgent, options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${range.from}-${range.to}` } })
                
                for (const item in devices.data) {
                    this.state.itemList.push(devices.data[item])
                }

                this.setState({
                    isLoadingMore: false,
                    totalcount: devices.totalcount,
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
                onClick={(e) => this.handleEdit(e)}
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
                if (this.state.itemList.length > 0) {
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
                    listComponent = <EmptyMessage message={I18n.t('devices.not_found')} icon={this.props.icon} showIcon={true} />
                }
            } else {
                listComponent = <EmptyMessage message={I18n.t('devices.not_found')} icon={this.props.icon} showIcon={true} />
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
                { listComponent }
                <Confirmation title={I18n.t('devices.delete')} message={this.props.selectedItems.length +` ${I18n.t('devices.title')}`} reference={el => this.contentDialog = el} /> 
            </React.Fragment>
        )
    }
}
DevicesList.propTypes = {
    selectionMode: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired,
    selectedItems: PropTypes.array.isRequired
}
