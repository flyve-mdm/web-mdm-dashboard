import React, { Component } from "react"
import PropTypes from 'prop-types'
import WinJS from 'winjs'
import ReactWinJS from 'react-winjs'
import FleetsItemList from './FleetsItemList'
import ItemList from '../ItemList'
import Loading from '../../Utils/Loading'

export default class FleetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItemList: []
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    componentWillUnmount() {
        this.setState({ selectedItemList: [] })
        this.props.changeSelectionMode(false)
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
        this.setState({ selectedItemList: index });
        
        if(!this.props.actionList !== 'Edit') {
            setTimeout(() => {
                if(index.length !== 0) {
                    this.props.changeActionList(null)
                }
                
                this.props.changeCurrentItem(null)
                this.props.onNavigate(index.length === 1 && !this.props.selectionMode ? [this.props.location[0], index[0]] : this.props.location);
            }, 0)
        }
        
    }

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
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

    handleRefresh = () => {
        this.props.fetchData(this.props.location[0])
    }

    handleEdit = (eventObject) => {
        let index = this.state.selectedItemList
        let button = eventObject.currentTarget.winControl

        setTimeout(() => {
            this.props.changeActionList(button.label)
            this.props.onNavigate(index.length > 0 && this.props.selectionMode ? [this.props.location[0], index] : this.props.location);
        }, 0)
    }

    handleDelete = () => {
        // Clean another actions selected
        this.props.changeActionList(null)
        // Exit selection mode
        this.props.changeSelectionMode(false)

        let item = this.props.itemList
        let index = this.state.selectedItemList
        index.sort()
        index.reverse()
        index.forEach((i) => {
            item.splice(i, 1)
        })

        this.setState({ selectedItem: [] })
        this.props.changeItemList(this.props.location, { itemList: item, sort: this.props.sort })
    }

    handleSort = () => {
        let array = []
        this.props.itemList.map((value, index) =>
            array.push(value)
        )
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.props.changeItemList(this.props.location, { itemList: ItemList(this.props.location[0], array, !this.props.sort), sort: !this.props.sort })
    }

    descendingCompare(first, second) {
        if (first === second)
            return 0
        else if (first < second)
            return 1
        else
            return -1
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

        let listComponent = <Loading message="Loading..." headerSize={48}/>

        if (this.isError) {
            listComponent = "Error"
        } else if (!this.props.isLoading) {
            listComponent = (
                <ReactWinJS.ListView
                    ref="listView"
                    className="contentListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.props.itemList.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    selectionMode={this.props.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.props.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                    onContentAnimating={this.handleContentAnimating}
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

            </div>
        )
    }
}
FleetsList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    sort: PropTypes.bool,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    changeCurrentItem: PropTypes.func.isRequired,
    selectionMode: PropTypes.bool.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string
}
