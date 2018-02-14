import React, { Component } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import DevicesItemList from './DevicesItemList'
import BuildItemList from '../BuildItemList'
import Loader from '../../Utils/Loader'
import Confirmation from '../../Utils/Confirmation'

export default class DevicesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItemList: [],
            scrolling: false,
            isLoading: false,
            itemList: new WinJS.Binding.List([]),
            order: undefined
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    componentDidUpdate(prevProps) {
        
        if(this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }

        if (!this.props.actionList && (prevProps.actionList === 'Edit' || prevProps.actionList === 'EditOne' || prevProps.actionList === 'Delete')) {
            this.handleRefresh()
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
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

    handleRefresh = () => {
        this.props.onNavigate([this.props.location[0]])
        this.setState({
            isLoading: true
        })
        this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmAgent', options: { uid_cols: true, forcedisplay: [2, 3, 12] } })
        .then((response) => {
            this.setState({
                isLoading: false,
                order: response.order,
                itemList: BuildItemList(response)
            })
        })
        .catch((error) => {
            this.setState({
                isLoading: false,
                order: undefined
            })
        })
    }

    handleEdit = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        setTimeout(() => {
            this.props.onNavigate(this.state.selectedItemList.length > 0 && this.props.selectionMode ? [this.props.location[0], this.state.selectedItemList] : this.props.location)
            this.props.changeActionList(button.label)
        }, 0)
    }

    handlePanel = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        this.listView.winControl.selection.clear()
        
        this.props.changeSelectionMode(false)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeActionList(button.label)
    }

    handleToggleSelectionMode = () => {
        this.listView.winControl.selection.clear()
        this.props.changeActionList(null)
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

        if (this.props.actionList !== 'Edit') {
               
            setTimeout(() => {
                if(index.length !== 0) {
                    this.props.changeActionList(null)
                }
                this.props.onNavigate(index.length === 1 && !this.props.selectionMode ? [this.props.location[0], this.state.selectedItemList] : this.props.location)
            }, 0)
        }
    }

    handleDelete = async (eventObject) => {
        let button = eventObject.currentTarget.winControl
        const isOK = await Confirmation.isOK(this.contentDialog)
        if (isOK) {

            let itemListToDelete = this.state.selectedItemList.map((item) => {
                return {
                    id: item["PluginFlyvemdmAgent.id"]
                }
            })

            this.setState({
                isLoading: true
            })
            this.props.changeActionList(button.label)

            this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmAgent', input: itemListToDelete, queryString: { force_purge: true } })
                .then((response) => {
                    this.props.showNotification('Success', 'elements successfully removed')
                    this.props.changeActionList(null)
                    this.props.changeSelectionMode(false)
                    this.setState({
                        selectedItemList: []
                    })
                })
                .catch((error) => {
                    if (error.length > 1) {
                        this.props.showNotification(error[0], error[1])
                    }
                    this.props.changeActionList(null)
                    this.props.changeSelectionMode(false)
                    this.setState({
                        selectedItemList: []
                    })
                })
        } else {
            // Clean another actions selected
            this.props.changeActionList(null)
            // Exit selection mode
            this.props.changeSelectionMode(false)
            this.listView.winControl.selection.clear()
            this.setState({
                selectedItemList: []
            })
        }
    }

    handleSort = () => {
        this.props.onNavigate([this.props.location[0]])
        this.setState({
            isLoading: true
        })
        let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

        this.props.glpi.searchItems('PluginFlyvemdmAgent', null, null, { uid_cols: true, order: newOrder, forcedisplay: [2, 3, 12] })
            .then((response) => {
                this.setState({
                    isLoading: false,
                    order: response.order,
                    itemList: BuildItemList(response)
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    order: undefined
                })
            })
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

    onFooterVisibilityChanged = (eventObject) => {

        let listView = eventObject.currentTarget.winControl
        
        if (eventObject.detail.visible && this.state.scrolling) {
            listView.footer.style.height = '100px'
            setTimeout(() => {
                listView.footer.style.height = '1px'
            }, 3000)
            
        } else {
            setTimeout(() => {
                listView.footer.style.height = '1px'
            }, 3000)
        }
    }

    render() {
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                label="Delete"
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
                    onFooterVisibilityChanged={this.onFooterVisibilityChanged}
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
                        priority={2}
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
                { listComponent }
                <Confirmation title={`Delete ` + this.props.location[0]} message={this.state.selectedItemList.length +` `+ this.props.location[0]} reference={el => this.contentDialog = el} /> 
            </div>
        )
    }
}
DevicesList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
