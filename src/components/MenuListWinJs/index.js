import React, { PureComponent } from "react"
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import WinJS from 'winjs'
import buildItemList from '../../shared/buildItemList'
import Loader from '../Loader'
import Confirmation from '../Confirmation'
import { AboutItemList, ApplicationsItemList, DevicesItemList, InvitationsItemList, SettingsItemList, FilesItemList, FleetsItemList, UsersItemList} from './ItemList'
import GLPI from '../../shared/glpiApi'
import publicURL from '../../shared/publicURL'

export default class ListWinJs extends PureComponent {

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
        if(this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }

        if (!this.props.action && (prevProps.action === 'Edit' || prevProps.action === 'EditOne' || prevProps.action === 'Delete')) {
            this.handleRefresh()
        }

        if (this.props.action === 'reload') {
            this.handleRefresh()
            this.props.changeAction(null)            
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        switch (this.props.screen) {
            case 'Devices':
                return <DevicesItemList itemList={ItemList.data} />
            case 'About':
                return <AboutItemList itemList={ItemList.data} />
            case 'Applications':
                return <ApplicationsItemList itemList={ItemList.data} />
            case 'Invitations':
                return <InvitationsItemList itemList={ItemList.data} />
            case 'Settings':
                return <SettingsItemList itemList={ItemList.data} />
            case 'Files':
                return <FilesItemList itemList={ItemList.data} />          
            case 'Fleets':
                return <FleetsItemList itemList={ItemList.data} />
            case 'Users':
                return <UsersItemList itemList={ItemList.data} />
            default:
                return undefined
        }
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
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })

            this.props.history.replace(`${publicURL}/app/devices`)

            const devices = await GLPI.searchItems({ 
                itemtype: this.props.handleRefreshRequest.itemtype, 
                options: { 
                    order: this.state.order, 
                    range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page) - 1}`,
                    ...this.props.handleRefreshRequest.options
                } 
            })
            
            this.setState({
                isLoading: false,
                order: devices.order,
                itemList: buildItemList(devices)
            })
            
        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleEdit = () => {
        this.props.history.replace(`${publicURL}/app/devices/edit`)        
    }

    handlePanel = (eventObject) => {
        this.listView.winControl.selection.clear()
        this.props.changeSelectionMode(false)
        this.props.history.replace(`${publicURL}/app/devices/add`)
    }

    handleToggleSelectionMode = () => {
        this.listView.winControl.selection.clear()
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.history.replace(`${publicURL}/app/devices`)
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
                if(index.length !== 0) {
                    this.props.changeAction(null)
                }
                if (index.length === 1 && !this.props.selectionMode) {
                    this.props.history.replace(
                        `${publicURL}/app/devices/${this.state.selectedItemList[0]['PluginFlyvemdmAgent.id']}`
                    )
                }
            }, 0)
        }
    }

    handleDelete = async (eventObject) => {
        try {
            let button = eventObject.currentTarget.winControl
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.state.selectedItemList.map((item) => {
                    return {
                        id: item[this.props.handleDeleteRequest.idKey]
                    }
                })

                this.setState({
                    isLoading: true
                })
                this.props.changeAction(button.label)

                await GLPI.deleteItem({ 
                    itemtype: this.props.handleDeleteRequest.itemtype, 
                    input: itemListToDelete, 
                    queryString: { force_purge: true } 
                })

                this.props.showNotification('Success', 'elements successfully removed')
                this.props.changeAction(null)
                this.props.changeSelectionMode(false)
                this.setState({
                    selectedItemList: []
                })
            } else {
                // Clean another actions selected
                this.props.changeAction(null)
                // Exit selection mode
                this.props.changeSelectionMode(false)
                this.listView.winControl.selection.clear()
                this.setState({
                    selectedItemList: []
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
            this.props.history.replace(`${publicURL}/app/devices`)
            this.setState({
                isLoading: true,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            let newOrder = this.state.order === 'ASC' ? 'DESC' : 'ASC'

            const devices = await GLPI.searchItems({ 
                itemtype: this.props.handleSortRequest.itemtype, 
                options: { 
                    uid_cols: true, 
                    order: newOrder, 
                    ...this.props.handleSortRequest.options
                } 
            })

            this.setState({
                isLoading: false,
                order: devices.order,
                itemList: buildItemList(devices)
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
            const devices = await GLPI.searchItems({ 
                itemtype: this.props.loadMoreDataRequest.itemtype, 
                options: { 
                    order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}`,
                    ...this.props.loadMoreDataRequest.options
                } 
            })
            
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
                    className="list-pane__content win-selectionstylefilled"
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
                <div className="list-pane" style={{ height: '100%', width: this.props.itemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
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

                { this.props.children }

            </React.Fragment>
        )
    }
}
ListWinJs.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    screen: PropTypes.string.isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    handleRefreshRequest: PropTypes.object.isRequired,
    handleDeleteRequest: PropTypes.object.isRequired,
    handleSortRequest: PropTypes.object.isRequired,
    loadMoreDataRequest: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}
