import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import InvitationsItemList from './InvitationsItemList'
import PropTypes from 'prop-types'
import BuildItemList from '../../../components/BuildItemList'
import WinJS from 'winjs'
import Loader from '../../../components/Loader'
import Confirmation from '../../../components/Confirmation'

export default class InvitationsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItems: [],
            scrolling: false,
            isLoading: true,
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

        if (this.props.action === "reload") {
            this.handleRefresh()
            this.props.changeAction(null)
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItems: [] })
        this.props.changeSelectionMode(false)
    }

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (
            <InvitationsItemList itemList={ItemList.data} size={42} />
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleToggleSelectionMode = () => {
        this.props.history.push('/app/invitations')
        this.props.changeSelectionMode(!this.props.selectionMode)     
        this.listView.winControl.selection.clear()
        this.setState((prevState, props) => ({
            selectedItems: []
        }))
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        let selectedItems = []

        for (const item of index) {
            selectedItems.push(this.state.itemList.getItem(item).data)
        }

        this.setState({ selectedItems }, () => {
            if (index.length === 1 && !this.props.selectionMode) {
                this.props.history.push(`/app/invitations/${selectedItems[0]["PluginFlyvemdmInvitation.id"]}`)
            }
        })
    }

    handleRefresh = () => {
        try {
            this.setState({
                isLoading: true,
                scrolling: false,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            }, async () => {
                const response = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmInvitation', options: { uid_cols: true, forcedisplay: [1, 2, 3], order: this.state.order, range: `${this.state.pagination.start}-${(this.state.pagination.count * this.state.pagination.page)-1}` } })
                this.setState({
                    isLoading: false,
                    order: response.order,
                    itemList: BuildItemList(response)
                })
            })
        } catch (e) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleDelete = async (eventObject) => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.state.selectedItems.map((item) => {
                    return {
                        id: item["PluginFlyvemdmInvitation.id"]
                    }
                })

                this.setState({ isLoading: true }, async () => {
                    await this.props.glpi.deleteItem({ itemtype: 'PluginFlyvemdmInvitation', input: itemListToDelete, queryString: { force_purge: true } })
    
                    this.props.setNotification({
                        title: 'Successfully',
                        body: 'Elements successfully removed',
                        type: 'success'
                    })
                    
                    this.props.changeAction('reload')
                    this.props.changeSelectionMode(false)
                    this.setState((prevState, props) => ({
                        selectedItems: []
                    }))
                })

            } else {
                // Exit selection mode
                this.props.changeSelectionMode(false)
                this.setState((prevState, props) => ({
                    selectedItems: []
                }))

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

            this.setState((prevState, props) => ({
                selectedItems: [],
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

            const response = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmInvitation', options: { uid_cols: true, order: newOrder, forcedisplay: [1, 2, 3] } })

            this.setState({
                isLoading: false,
                order: response.order,
                itemList: BuildItemList(response)
            })
            this.props.history.push('/app/invitations')

        } catch (error) {
            this.setState({
                isLoading: false,
                order: "ASC"
            })
        }
    }

    handleResendEmail = () => {
        this.props.setNotification({
            title: 'Successfully',
            body: 'Invitations sent',
            type: 'success'
        })       
        this.handleToggleSelectionMode()
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
            const invitations = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmInvitation', options: { uid_cols: true, forcedisplay: [1, 2, 3], order: this.state.order, range: `${this.state.pagination.count * this.state.pagination.page}-${(this.state.pagination.count * (this.state.pagination.page + 1)) - 1}` } })

            for (const item in invitations.data) {
                this.state.itemList.push(invitations.data[item])
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

    handleAdd = () => {
        this.props.history.push("/app/invitations/add")
        this.props.changeSelectionMode(false)
        this.listView.winControl.selection.clear()
        this.setState({ selectedItems: [] })
    }

    render() {
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                label="Delete"
                priority={0}
                disabled={this.state.selectedItems.length === 0}
                onClick={this.handleDelete}
            />
        )

        let resendCommand = (
            <ReactWinJS.ToolBar.Button
                key="mail"
                icon="mail"
                label="Resend Email"
                priority={0}
                disabled={this.state.selectedItems.length === 0}
                onClick={this.handleResendEmail}
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

                    {this.props.selectionMode ? resendCommand : null}
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
                <Confirmation title="Delete Invitations" message={`${this.state.selectedItems.length} Invitations`} reference={el => this.contentDialog = el} /> 
            </div>
        )
    }
}
InvitationsList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    action: PropTypes.string,
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
