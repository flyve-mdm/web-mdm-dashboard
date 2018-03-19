import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import FleetsItemList from './FleetsItemList'
import BuildItemList from '../../../components/BuildItemList'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'

export default class FleetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
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
        if (this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }

        if (this.props.action === "reload") {
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

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <FleetsItemList itemList={ItemList.data} size={42} />
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleRefresh = async () => {
        try {
            this.props.history.push('/app/fleets')
            this.setState({
                isLoading: true,
                scrolling: false,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            const Fleets = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
            this.setState({
                isLoading: false,
                order: Fleets.order,
                itemList: BuildItemList(Fleets)
            })

        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit(eventObject, path) {
        this.props.history.push(path)
    }

    handleAdd = () => {
        this.props.history.push("/app/fleets/add")
        this.props.changeSelectionMode(false)
        this.props.changeSelectedItems([])
        this.listView.winControl.selection.clear()
    }

    handleToggleSelectionMode = () => {
        this.props.history.push('/app/fleets')
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.changeSelectedItems([])
        this.listView.winControl.selection.clear()
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
            this.props.history.push(`/app/fleets/${itemSelected[0]["PluginFlyvemdmFleet.id"]}`)
        }
        if (index.length > 1 && !this.props.selectionMode) {
            this.props.history.push('/app/fleets/edit/')
        }
    }

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

                await this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmFleet', input: itemListToDelete, queryString: { force_purge: true } })

                this.props.setNotification({
                    title: 'Successfully',
                    body: 'Fleet successfully removed!',
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.changeSelectedItems([])
                this.props.changeAction('reload')

                this.setState((prevState, props) => ({
                    isLoading: false
                }))
            } else {
                // Exit selection mode
                this.props.changeSelectionMode(false)
                this.props.changeSelectedItems([])

                this.listView.winControl.selection.clear()
            }

        } catch (error) {
            if (error.length > 1) {

                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }

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

            const Fleets = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, order: newOrder, forcedisplay: [2, 3, 4, 12] } })

            this.setState({
                isLoading: false,
                order: Fleets.order,
                itemList: BuildItemList(Fleets)
            })
            this.props.history.push('/app/fleets')

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
            const Fleets = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmFleet', options: { uid_cols: true, forcedisplay: [2, 3, 4, 12], order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}` } })

            for (const item in Fleets.data) {
                this.state.itemList.push(Fleets.data[item])
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
                priority={0}
                disabled={this.props.selectedItems.length === 0}
                onClick={this.handleDelete}
            />
        )

        let editCommand = (
            <ReactWinJS.ToolBar.Button
                key="edit"
                icon="edit"
                label="Edit"
                priority={0}
                disabled={this.props.selectedItems.length === 0}
                onClick={(e) => this.handleEdit(e, "/app/fleets/edit")}
            />
        )

        let listComponent = <Loader count={3} />

        if (!this.state.isLoading && this.state.itemList.groups !== undefined) {
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
                    selectionMode={this.props.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                />
            )
        }

        return (
            <React.Fragment>
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
                        priority={2}
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
                {listComponent}
                <Confirmation title={`Delete Fleets`} message={this.props.selectedItems.length + ` Fleets`} reference={el => this.contentDialog = el} />
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
