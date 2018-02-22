import React, { Component } from "react"
import PropTypes from 'prop-types'
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'
import FleetsItemList from './FleetsItemList'
import Loader from '../../Utils/Loader'
import Confirmation from '../../Utils/Confirmation'

export default class FleetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItemList: [],
            scrolling: false,
            isLoading: false,
            itemList: new WinJS.Binding.List([]),
            order: "ASC",
            pagination: {
                start: 0,
                count: 15,
                page: 1
            }
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(false)
    }

    componentDidUpdate(prevProps) {
        if(this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }

        if (!this.props.actionList && (prevProps.actionList === 'Edit' || prevProps.actionList === 'EditOne' || prevProps.actionList === 'Delete')) {
            this.handleRefresh()
        }
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <FleetsItemList itemList={ItemList.data} />
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleToggleSelectionMode = () => {
        
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(!this.props.selectionMode)      
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        let itemSelected = []

        for (const item of index) {
            itemSelected.push(this.state.itemList.getItem(item).data)
        }

        this.setState({
            selectedItemList: itemSelected
        })

        if (this.props.actionList !== 'Edit') {
               
            setTimeout(() => {
                if(index.length !== 0) {
                    this.props.changeActionList(null)
                }
                this.props.onNavigate(index.length === 1 && !this.props.selectionMode ? [this.props.location[0], this.state.selectedItemList] : this.props.location)
            }, 0)
        }
    }

    handleAdd = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        this.refs.listView.winControl.selection.clear()

        setTimeout(() => {
            this.props.changeSelectionMode(false)      
            this.props.changeActionList(button.label)
            this.props.onNavigate([this.props.location[0]])
        }, 0)
    }

    handleRefresh = async () => {
        this.props.onNavigate([this.props.location[0]])
        this.setState({
            isLoading: true,
            scrolling: false,
            pagination: {
                start: 0,
                page: 1,
                count: 15
            }
        })
        try {
            const response = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, forcedisplay: [2, 5], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
            this.setState({
                isLoading: false,
                order: response.order,
                itemList: new WinJS.Binding.List(response.data)
            })
        } catch (e) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit = (eventObject) => {
        let index = this.state.selectedItemList
        let button = eventObject.currentTarget.winControl

        setTimeout(() => {
            this.props.changeActionList(button.label)
            this.props.onNavigate(index.length > 0 && this.props.selectionMode ? [this.props.location[0], index] : this.props.location);
        }, 0)
    }

    handleDelete = async () => {
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {
            // Clean another actions selected
            this.props.changeActionList(null)
            // Exit selection mode
            this.props.changeSelectionMode(false)

            let item = this.props.dataSource.itemList
            let index = this.state.selectedItemList
            index.sort()
            index.reverse()
            index.forEach((i) => {
                item.splice(i, 1)
            })

            if (this.state.selectedItemList > 1) {
                this.props.showNotification('Success', 'deleted fleets')
            } else {
                this.props.showNotification('Success', 'deleted fleet')
            }

            this.setState({ selectedItem: [] })
            this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
        } else {
            // Clean another actions selected
            this.props.changeActionList(null)
            // Exit selection mode
            this.props.changeSelectionMode(false)
            this.refs.listView.winControl.selection.clear()
            this.setState({
                selectedItem: []
            })
        }
    }

    handleSort = async () => {
        try {
            this.props.onNavigate([this.props.location[0]])
            this.setState({
                isLoading: true,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

            const response = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, order: newOrder, forcedisplay: [2, 5] } })
            
            this.setState({
                isLoading: false,
                order: response.order,
                itemList: new WinJS.Binding.List(response.data)
            })

        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    descendingCompare(first, second) {
        if (first === second)
            return 0
        else if (first < second)
            return 1
        else
            return -1
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
            const devices = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, forcedisplay: [2], order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}` } })
            
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
                priority={0}
                disabled={this.state.selectedItemList.length === 0}
                onClick={this.handleDelete}
            />
        )

        let editCommand = (
            <ReactWinJS.ToolBar.Button
                key="edit"
                icon="edit"
                label="Edit"
                priority={0}
                disabled={this.state.selectedItemList.length === 0}
                onClick={this.handleEdit}
            />
        )

        let listComponent = <Loader count={3} />
        
        if (!this.state.isLoading && this.state.itemList) {
            listComponent = (
                <ReactWinJS.ListView
                    ref={(listView) => { this.listView = listView }}
                    onLoadingStateChanged={this.onLoadingStateChanged}
                    className="contentListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.state.itemList.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    footerComponent={<Loader />}
                    onFooterVisibilityChanged={this.showFooterList}
                    selectionMode={this.props.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                />
            )
        }

        return (
            <div className="listPane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                <ReactWinJS.ToolBar className="listToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="sort"
                        icon="sort"
                        label="Sort"
                        priority={1}
                        onClick={this.handleSort}
                    />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label="Refresh"
                        priority={1}
                        onClick={this.handleRefresh}
                    />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0}
                        onClick={this.handleAdd}
                    />

                    {this.props.selectionMode ? editCommand : null}
                    {this.props.selectionMode ? deleteCommand : null}

                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.props.selectionMode}
                        onClick={this.handleToggleSelectionMode}
                    />
                </ReactWinJS.ToolBar>

                {listComponent }
                
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.selectedItemList.length + ` ` + this.props.location[0]} reference={el => this.contentDialog = el} />
            </div>
        )
    }
}
FleetsList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    animation: PropTypes.bool.isRequired,
    dataSource: PropTypes.object.isRequired,
    changeDataSource: PropTypes.func.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}
