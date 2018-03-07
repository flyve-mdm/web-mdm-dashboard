import React, {Component} from "react"
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'
import FleetsItemList from './FleetsItemList'
import Loader from '../../../../components/Loader'
import Confirmation from '../../../../components/Confirmation'

class FleetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: {
                type: WinJS.UI.ListLayout
            },
            selectedItemList: [],
            scrolling: false,
            isLoading: false,
            itemList: new WinJS
                .Binding
                .List([]),
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

    componentDidUpdate(prevProps) {
        if(this.listView && !this.state.scrolling) {
            this.listView.winControl.footer.style.height = '1px'
        }
    }

    handleRefresh = async() => {
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
            const response = await this
                .props
                .glpi
                .searchItems({
                    itemtype: 'PluginFlyvemdmFleet',
                    options: {
                        uid_cols: true,
                        forcedisplay: [
                            2, 5
                        ],
                        order: this.state.order,
                        range: `${this.state.pagination.start}-${ (this.state.pagination.count * this.state.pagination.page) - 1}`
                    }
                })
            this.setState({
                isLoading: false,
                order: response.order,
                itemList: new WinJS
                    .Binding
                    .List(response.data)
            })
        } catch (e) {
            this.setState({isLoading: false, order: "ASC"})
        }
    }

    loadMoreData = async() => {
        try {
            const devices = await this
                .props
                .glpi
                .searchItems({
                    itemtype: 'PluginFlyvemdmFleet',
                    options: {
                        uid_cols: true,
                        forcedisplay: [2],
                        order: this.state.order,
                        range: `${this.state.pagination.count * this.state.pagination.page}-${ (this.state.pagination.count * (this.state.pagination.page + 1)) - 1}`
                    }
                })

            for (const item in devices.data) {
                this
                    .state
                    .itemList
                    .push(devices.data[item])
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

    ItemListRenderer = ReactWinJS.reactRenderer((ItemList) => {
        return (<FleetsItemList 
                itemList={ItemList.data} 
                clicked={this.props.handleClickFleet}/>)
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleSort = async() => {
        try {
            this.setState({
                isLoading: true,
                pagination: {
                    start: 0,
                    page: 1,
                    count: 15
                }
            })
            let newOrder = this.state.order === 'ASC'
                ? 'DESC'
                : 'ASC'

            const response = await this
                .props
                .glpi
                .searchItems({
                    itemtype: 'PluginFlyvemdmFleet',
                    options: {
                        uid_cols: true,
                        order: newOrder,
                        forcedisplay: [2, 5]
                    }
                })

            this.setState({
                isLoading: false,
                order: response.order,
                itemList: new WinJS
                    .Binding
                    .List(response.data)
            })

        } catch (error) {
            this.setState({isLoading: false, order: "ASC"})
        }
    }

    onLoadingStateChanged = (eventObject) => {
        if (eventObject.detail.scrolling === true) {
            setTimeout(() => {
                this.setState({scrolling: true})
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

    render() {
        let deleteCommand = (<ReactWinJS.ToolBar.Button
            key="delete"
            icon="delete"
            priority={0}
            disabled={this.state.selectedItemList.length === 0}
            onClick={this.handleDelete}/>)

        let editCommand = (<ReactWinJS.ToolBar.Button
            key="edit"
            icon="edit"
            label="Edit"
            priority={0}
            disabled={this.state.selectedItemList.length === 0}
            onClick={this.handleEdit}/>)

        let listComponent = <Loader count={3}/>

        if (!this.state.isLoading && this.state.itemList) {
            listComponent = (
                <ReactWinJS.ListView
                    ref={(listView) => {
                    this.listView = listView
                    }}
                    onLoadingStateChanged={this.onLoadingStateChanged}
                    className="contentListView win-selectionstylefilled"
                    style={{
                    height: 'calc(100% - 48px)'
                    }}
                    itemDataSource={this.state.itemList.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    footerComponent={< Loader />}
                    onFooterVisibilityChanged={this.showFooterList}
                    selectionMode={this.props.selectionMode
                    ? 'multi'
                    : 'single'}
                    tapBehavior={this.props.selectionMode
                    ? 'toggleSelect'
                    : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}/>
            )
        }

        return (
            <div className="flex-block --with-scroll --with-content-pane">
                <div
                    className="listPane"
                    style={{
                    height: '100%',
                    width: this.props.itemListPaneWidth,
                    display: 'inline-block',
                    verticalAlign: 'top'
                }}>
                    <ReactWinJS.ToolBar className="listToolBar">
                        <ReactWinJS.ToolBar.Button
                            key="sort"
                            icon="sort"
                            label="Sort"
                            priority={1}
                            onClick={this.handleSort}/>
                        <ReactWinJS.ToolBar.Button
                            key="refresh"
                            icon="refresh"
                            label="Refresh"
                            priority={1}
                            onClick={this.handleRefresh}/>

                        <ReactWinJS.ToolBar.Button
                            key="add"
                            icon="add"
                            label="Add"
                            priority={0}
                            onClick={this.handleAdd}/> 

                        {this.props.selectionMode ? editCommand : null}
                        {this.props.selectionMode ? deleteCommand : null}

                        <ReactWinJS.ToolBar.Toggle
                            key="select"
                            icon="bullets"
                            label="Select"
                            priority={0}
                            selected={this.props.selectionMode}
                            onClick={this.handleToggleSelectionMode}/>
                    </ReactWinJS.ToolBar>

                    {listComponent}

                    <Confirmation
                        title={`Delete `}
                        message={'mock message'}
                        reference={el => this.contentDialog = el}/>
                </div>
                <div className="flex-block --with-scroll --with-content-pane" style={{
                    width: '100%'
                }}>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default FleetsList