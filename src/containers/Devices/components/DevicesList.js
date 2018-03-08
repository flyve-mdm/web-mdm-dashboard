import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import DevicesItemList from './DevicesItemList'
import BuildItemList from '../../../components/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'

export default class DevicesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectionMode: false,
            selectedItems: [],
            scrolling: false,
            isLoading: false,
            itemList: new WinJS.Binding.List([]),
            order: "ASC",
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
        if(this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }

        if (!this.props.data.action && (prevProps.action === 'Edit' || prevProps.action === 'EditOne' || prevProps.action === 'Delete')) {
            this.handleRefresh()
        }

        if (this.props.data.action === "reload") {
            this.handleRefresh()
            this.props.data.changeAction(null)
        }
    }

    componentWillUnmount() {
        this.setState({ 
            selectionMode: false,
            selectedItem: [] 
        })
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
            this.props.data.history.push('/app/devices')
            this.setState({
                isLoading: true,
                scrolling: false,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            const devices = await this.props.data.glpi.searchItems({ itemtype: 'PluginFlyvemdmAgent', options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
            this.setState({
                isLoading: false,
                order: devices.order,
                itemList: BuildItemList(devices)
            })
            
        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        setTimeout(() => {
            this.props.data.onNavigate(this.state.selectedItems.length > 0 && this.state.selectionMode ? [this.props.data.location[0], this.state.selectedItems] : this.props.data.location)
            this.props.data.changeAction(button.label)
        }, 0)
    }

    handleAdd(eventObject, path) {

        this.listView.winControl.selection.clear()
        this.setState({
            selectedItems: [],
            selectionMode: false
        })
        this.props.data.history.push(path)
    }

    handleToggleSelectionMode = () => {
        this.listView.winControl.selection.clear()
        this.setState((prevState, props) => ({
            selectedItems: [],
            selectionMode: !prevState.selectionMode
        }))
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        let itemSelected = []

        for (const item of index) {
            itemSelected.push(this.state.itemList.getItem(item).data)
        }
        this.setState({
            selectedItems: itemSelected
        })
        this.props.data.changeSelectedItems(itemSelected)
        if (index.length === 1 && !this.state.selectionMode) {
            this.props.data.history.push(`/app/devices/${itemSelected[0]["PluginFlyvemdmAgent.id"]}`)
        }
        if (index.length > 1 && !this.state.selectionMode) {
            this.props.data.history.push('/app/devices/edit/')
        }
    }

    handleDelete = async (eventObject) => {
        try {
            let button = eventObject.currentTarget.winControl
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.state.selectedItems.map((item) => {
                    return {
                        id: item["PluginFlyvemdmAgent.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })
                this.props.data.changeAction(button.label)

                await this.props.data.glpi.deleteItem({ itemtype: 'PluginFlyvemdmAgent', input: itemListToDelete, queryString: { force_purge: true } })

                this.props.data.setNotification({
                    title: 'Successfully',
                    body: 'Device successfully removed!',
                    type: 'success'
                })

                this.setState((prevState, props) => ({
                    selectedItems: [],
                    selectionMode: !prevState.selectionMode,
                    isLoading: false
                }))
            } else {
                // Exit selection mode
                this.setState((prevState, props) => ({
                    selectedItems: [],
                    selectionMode: !prevState.selectionMode
                }))

                this.listView.winControl.selection.clear()
            }
            
        } catch (error) {
            if (error.length > 1) {

                this.props.data.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }

            this.setState((prevState, props) => ({
                selectedItems: [],
                selectionMode: !prevState.selectionMode,
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

            const devices = await this.props.data.glpi.searchItems({ itemtype: 'PluginFlyvemdmAgent', options: { uid_cols: true, order: newOrder, forcedisplay: [2, 3, 4, 12] } })

            this.setState({
                isLoading: false,
                order: devices.order,
                itemList: BuildItemList(devices)
            })
            this.props.data.history.push('/app/devices')

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

    showFooterList = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        if (eventObject.detail.visible && this.state.scrolling) {
            listView.footer.style.height = '100px'
            this.loadMoreData()
        }
    }

    loadMoreData = async () => {
        try {
            const devices = await this.props.data.glpi.searchItems({ itemtype: 'PluginFlyvemdmAgent', options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}` } })
            
            for (const item in devices.data) {
                this.state.itemList.push(devices.data[item])
            }

            this.setState({
                pagination: {
                    ...this.state.pagination,
                    page: this.state.pagination.page + 1
                }
            })

            this.listView.winControl.footer.style.height = '1px'

        } catch (error) {
            this.listView.winControl.footer.style.height = '1px'
        }
    }

    render() {
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                label="Delete"
                path="/"
                priority={0}
                disabled={this.state.selectedItems.length === 0}
                onClick={this.handleDelete}
            />
        )

        let editCommand = (
            <ReactWinJS.ToolBar.Button
                key="edit"
                icon="edit"
                label="Edit"
                path="/"
                priority={0}
                disabled={this.state.selectedItems.length === 0}
                onClick={this.handleEdit}
            />
        )

        let listComponent = <Loader count={3} />

        if (!this.state.isLoading && this.state.itemList.groups !== undefined ) {
            listComponent = (
                <ReactWinJS.ListView
                    ref={(listView) => { this.listView = listView }}
                    onLoadingStateChanged={this.onLoadingStateChanged}
                    className="contentListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.state.itemList.dataSource}
                    groupDataSource={this.state.itemList.groups.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                    footerComponent={<Loader />}
                    onFooterVisibilityChanged={this.showFooterList}
                    selectionMode={this.state.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.state.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                />
            )
        }

        return (
            <div className="listPane" style={{ height: '100%', width: this.props.data.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                <ReactWinJS.ToolBar className="listToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="sort"
                        icon="sort"
                        label="Sort"
                        path="/"
                        priority={1}
                        onClick={this.handleSort}
                    />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label="Refresh"
                        path="/"
                        priority={2}
                        onClick={this.handleRefresh}
                    />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0}
                        onClick={(e) => this.handleAdd(e, "/app/devices/add")}
                    />

                    {this.state.selectionMode ? editCommand : null}
                    {this.state.selectionMode ? deleteCommand : null}

                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        path="/"
                        priority={0}
                        selected={this.state.selectionMode}
                        onClick={this.handleToggleSelectionMode}
                    />
                </ReactWinJS.ToolBar>
                { listComponent }
                <Confirmation title={`Delete Devices`} message={this.state.selectedItems.length +` Devices`} reference={el => this.contentDialog = el} /> 
            </div>
        )
    }
}
DevicesList.propTypes = {
    data: PropTypes.shape({
        itemListPaneWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        animation: PropTypes.bool.isRequired,
        location: PropTypes.array.isRequired,
        onNavigate: PropTypes.func.isRequired,
        action: PropTypes.string,
        changeAction: PropTypes.func.isRequired,
        setNotification: PropTypes.func.isRequired,
        glpi: PropTypes.object.isRequired
    })
}
