import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import InvitationsItemList from './InvitationsItemList'
import PropTypes from 'prop-types'
import BuildItemList from '../BuildItemList'
import ItemList from '../ItemList'
import WinJS from 'winjs'
import Loader from '../../Utils/Loader'

export default class InvitationsList extends Component {

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

    componentDidUpdate() {

        if (this.refs.listView !== undefined && !this.state.scrolling) {
            this.refs.listView.winControl.footer.style.height = '1px'
        }
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
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
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(!this.props.selectionMode)
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        setTimeout(function () {
            this.setState({ selectedItemList: index });
            this.props.onNavigate(index.length === 1 && !this.props.selectionMode ? [this.props.location[0], index] : this.props.location);
        }.bind(this), 0)
    }

    handleRefresh = async () => {

        try {
            this.props.onNavigate([this.props.location[0]])
            this.setState({
                isLoading: true
            })

            const invitations = await this.props.glpi.searchItems({ itemtype: 'PluginFlyvemdmInvitation', options: { uid_cols: true, forcedisplay: [1, 2, 3] } })

            this.setState({
                isLoading: false,
                order: invitations.order,
                itemList: BuildItemList(invitations)
            })

        } catch (error) {
            this.setState({
                isLoading: false,
                order: undefined
            })
        }
    }

    handlePanel = (eventObject) => {
        let button = eventObject.currentTarget.winControl
        this.refs.listView.winControl.selection.clear()

        this.props.changeSelectionMode(false)
        this.props.changeActionList(button.label)
        this.props.onNavigate([this.props.location[0]])
    }

    handleDelete = () => {
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
        this.setState({
            selectedItem: []
        })
        this.props.changeDataSource(this.props.location, { itemList: item, sort: this.props.dataSource.sort })
        if (this.state.selectedItemList.length > 1) {
            this.props.showNotification('Success', 'invitation sent')                        
        } else {
            this.props.showNotification('Success', 'element successfully removed')         
        }
    }

    handleSort = () => {
        let array = []
        this.props.dataSource.itemList.map((value, index) =>
            array.push(value)
        );
        this.props.changeDataSource(this.props.location, { itemList: ItemList(this.props.location[0], array, !this.props.dataSource.sort), sort: !this.props.dataSource.sort })
    }

    descendingCompare(first, second) {
        if (first === second)
            return 0;
        else if (first < second)
            return 1;
        else
            return -1;
    }

    handleResendEmail = () => {
        if (this.state.selectedItemList.length > 1) {
            this.props.showNotification('Success', 'invitations sent')                        
        } else {
            this.props.showNotification('Success', 'invitation sent')         
        }          
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
                priority={0}
                disabled={this.state.selectedItemList.length === 0}
                onClick={this.handleDelete}
            />
        )

        let resendCommand = (
            <ReactWinJS.ToolBar.Button
                key="mail"
                icon="mail"
                label="Resend Email"
                priority={0}
                disabled={this.state.selectedItemList.length === 0}
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
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
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
                
            </div>
        )
    }
}
InvitationsList.propTypes = {
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
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
