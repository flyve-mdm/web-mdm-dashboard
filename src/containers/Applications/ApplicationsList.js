import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import ApplicationsItemList from './ApplicationsItemList'
import Loader from '../../components/Loader'
import Confirmation from '../../components/Confirmation'

export default class ApplicationsList extends Component {

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

        if (this.props.action === "Reload") {
            this.handleRefresh()
            this.props.changeAction(null)
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <ApplicationsItemList itemList={ItemList.data} size={42} />
        )
    })

    handleRefresh = async () => {
        try {
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
            const files = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmPackage', options: { uid_cols: true, forcedisplay: [1, 2, 3, 4, 5, 6], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}` } })
            this.setState({
                isLoading: false,
                order: files.order,
                itemList: new WinJS.Binding.List(files.data)
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
            this.props.onNavigate(this.state.selectedItemList.length > 0 && this.props.selectionMode ? [this.props.location[0], this.state.selectedItemList] : this.props.location)
            this.props.changeAction(button.label)
        }, 0)
    }

    handlePanel = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        this.listView.winControl.selection.clear()

        this.props.changeSelectionMode(false)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeAction(button.label)
    }

    handleToggleSelectionMode = () => {
        this.listView.winControl.selection.clear()
        this.props.changeAction(null)
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.onNavigate([this.props.location[0]])
        this.setState({
            selectedItemList: []
        })
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

        if (this.props.action !== 'Edit') {

            setTimeout(() => {
                if (index.length !== 0) {
                    this.props.changeAction(null)
                }
                this.props.onNavigate(index.length === 1 && !this.props.selectionMode ? [this.props.location[0], this.state.selectedItemList] : this.props.location)
            }, 0)
        }
    }

    handleDelete = async (eventObject) => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.state.selectedItemList.map((item) => {
                    return {
                        id: item["PluginFlyvemdmPackage.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })

                await this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmPackage', input: itemListToDelete, queryString: { force_purge: true } })

                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeSelectionMode(false)
                this.props.changeAction("Reload")
                this.setState({
                    selectedItemList: [],
                })
            } else {
                // Clean another actions selected
                this.props.changeAction(null)
                // Exit selection mode
                this.props.changeSelectionMode(false)
                this.listView.winControl.selection.clear()
                this.setState({
                    selectedItemList: [],
                    isLoading: false
                })
            }

        } catch (error) {
            if (error.length > 1) {
                this.props.showNotification(error[0], error[1])
            }
            this.props.changeAction(null)
            this.props.changeSelectionMode(false)
            this.setState({
                selectedItemList: []
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

            const files = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmPackage', options: { uid_cols: true, order: newOrder, forcedisplay: [1, 2, 3, 4, 5, 6] } })

            this.setState({
                isLoading: false,
                order: files.order,
                itemList: new WinJS.Binding.List(files.data)
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

    showFooterList = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        if (eventObject.detail.visible && this.state.scrolling) {
            listView.footer.style.height = '100px'
            this.loadMoreData()
        }
    }

    loadMoreData = async () => {
        try {
            const files = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmPackage', options: { uid_cols: true, forcedisplay: [1, 2, 3, 4, 5, 6], order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}` } })
            for (const item in files.data) {
                this.state.itemList.push(files.data[item])
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

        if (!this.state.isLoading && this.state.itemList.length > 0) {
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
                        onClick={this.handlePanel}
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
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.selectedItemList.length + ` ` + this.props.location[0]} reference={el => this.contentDialog = el} />
            </div>
        )
    }
}
ApplicationsList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
