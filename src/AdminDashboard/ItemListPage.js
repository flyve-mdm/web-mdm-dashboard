import React, { Component } from "react"
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../Utils/Calc100PercentMinus'
import IconItemList from './IconItemList'
import PropTypes from 'prop-types'
import ItemList from './ItemList'
let WinJS = require('winjs')

class ItemListPage extends Component {

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
            <div>
                <IconItemList backgroundUrl={ItemList.data.picture} size={34} />
                <span className="name">{ItemList.data.name}</span>
            </div>
        )
    })

    groupHeaderRenderer = ReactWinJS.reactRenderer((item) => {
        return (
            <div>{item.data.title}</div>
        )
    })

    handleToggleSelectionMode = () => {
        this.setState({ selectionMode: !this.state.selectionMode })
        this.props.onNavigate(this.props.location)
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let index = listView.selection.getIndices()
        setTimeout(function () {
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

    renderItemListPane(ItemListPaneWidth) {
 
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
            <div className="peopleSearchPane" style={{ height: '100%', width: ItemListPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
                <ReactWinJS.ToolBar className="peopleToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="edit"
                        icon="edit"
                        label="Edit"
                        priority={4}
                    />
                    <ReactWinJS.ToolBar.Button
                        key="favorite"
                        icon="favorite"
                        label="Favorite"
                        priority={3}
                    />
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
                    className="peopleListView win-selectionstylefilled"
                    style={{ height: 'calc(100% - 48px)' }}
                    itemDataSource={this.props.itemList.dataSource}
                    groupDataSource={this.props.itemList.groups.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.ItemListRenderer}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                    selectionMode={this.state.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.state.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                    onContentAnimating={this.handleContentAnimating}
                />
            </div>
        )
    }

    renderContentPane(selectedIndex, ItemListPaneWidth) {
        if (selectedIndex === null) {
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(ItemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedItemList = this.props.itemList.getAt(selectedIndex)
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(ItemListPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div className="profileHeader">
                        <div className="name">{selectedItemList.name}</div>
                        <div className="personInfo">
                            <IconItemList backgroundUrl={selectedItemList.picture} size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {selectedItemList.status}
                                </span>
                                <span className="source">{selectedItemList.statusHoursAgo} hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
                        <ul>
                            <li><span className="messageIcon" />Message</li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Mobile</a>
                                    <div className="number">{selectedItemList.mobilePhone}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedItemList.workPhone}</div>
                                </div>
                            </li>
                            <li><span className="phoneIcon" />Call using an app</li>
                            <li><span className="videoCallIcon" />Video call</li>
                            <li><span className="emailIcon" />Email work</li>
                            <li><span className="mapIcon" />Map home</li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return this.renderItemListPane('100%')
            } else {
                return this.renderContentPane(selectedIndex, 0)
            }
        } else {
            let ItemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    {this.renderItemListPane(ItemListPaneWidth)}
                    {this.renderContentPane(selectedIndex, ItemListPaneWidth)}
                </div>
            )
        }
    }
}

ItemListPage.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired
}

export default ItemListPage
