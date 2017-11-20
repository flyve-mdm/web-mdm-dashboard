import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import FleetsItemList from './FleetsItemList'
import PropTypes from 'prop-types'
import ItemList from '../ItemList'
let WinJS = require('winjs')

export default class FleetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedItemList: [],
            selectionMode: false
        }
    }

    componentWillUnmount() {
        this.setState({ selectionMode: false, selectedItemList: [] })
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
        this.setState({ selectionMode: !this.state.selectionMode })
        this.props.changeActionList(null)
        this.props.onNavigate([this.props.location[0]])
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        setTimeout(function () {
            if(index.length !== 0) {
                this.props.changeActionList(null)
            }
            this.setState({ selectedItemList: index });
            this.props.onNavigate(index.length === 1 && !this.state.selectionMode ? [this.props.location[0], index[0]] : this.props.location);
        }.bind(this), 0)
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

        setTimeout(function () {
            this.setState({ selectionMode: false })
            this.props.changeActionList(button.label)
            this.props.onNavigate([this.props.location[0]])
        }.bind(this), 0)
    }

    handleDelete = () => {
        let item = this.props.itemList
        let index = this.state.selectedItemList
        index.sort()
        index.reverse()
        index.forEach((i) => {
            item.splice(i, 1)
        })
        this.setState({
            selectedItem: [],
            selectionMode: false
        })
        this.props.changeItemList(this.props.location, { itemList: item, sort: this.props.sort })
    }

    handleSort = () => {
        let array = []
        this.props.itemList.map((value, index) =>
            array.push(value)
        );
        this.props.changeItemList(this.props.location, { itemList: ItemList(this.props.location[0], array, !this.props.sort), sort: !this.props.sort })
    }

    descendingCompare(first, second) {
        if (first === second)
            return 0;
        else if (first < second)
            return 1;
        else
            return -1;
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
                    />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0}
                        onClick={this.handleAdd}
                    />

                    {this.state.selectionMode ? deleteCommand : null}

                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.state.selectionMode}
                        onClick={this.handleToggleSelectionMode}
                    />
                </ReactWinJS.ToolBar>

                <ReactWinJS.ListView
                    ref="listView"
                    className="contentListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.props.itemList.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    selectionMode={this.state.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.state.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                    onContentAnimating={this.handleContentAnimating}
                />
            </div>
        )
    }
}
FleetsList.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired
}
