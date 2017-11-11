import * as React from 'react'
import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../Utils/Calc100PercentMinus'
import IconListItem from './IconListItem'
import PropTypes from 'prop-types'
let WinJS = require('winjs')

class ListItemPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedListItem: [],
            selectionMode: false
        }
    }

    listItemRenderer = ReactWinJS.reactRenderer((listItem) => {
        return (
            <div>
                <IconListItem backgroundUrl={listItem.data.picture} size={34} />
                <span className="name">{listItem.data.name}</span>
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
        this.props.onNavigate(["Devices"])
        this.refs.listView.winControl.selection.clear()
    }

    handleSelectionChanged = (eventObject) => {
        let listView = eventObject.currentTarget.winControl
        let indices = listView.selection.getIndices()
        setTimeout(function () {
            this.setState({ selectedListItem: indices });
            this.props.onNavigate(indices.length === 1 && !this.state.selectionMode ? ["Devices", indices[0]] : ["Devices"]);
        }.bind(this), 0)
    }

    handleContentAnimating(eventObject) {
        // Disable ListView's entrance animation
        if (eventObject.detail.type === 'entrance') {
            eventObject.preventDefault()
        }
    }

    handleDelete = () => {
        let item = this.props.listItem
        let indices = this.state.selectedListItem
        indices.sort()
        indices.reverse()
        indices.forEach((i) => {
            item.splice(i, 1)
        })
        this.setState({
            selectedItem: [],
            selectionMode: false
        })
        this.props.changeListItem(item)
    }

    renderListItemPane(listItemPaneWidth) {
 
        let deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                priority={0}
                disabled={this.state.selectedListItem.length === 0}
                onClick={this.handleDelete}
            />
        )

        return (
            <div className="peopleSearchPane" style={{ height: '100%', width: listItemPaneWidth, display: 'inline-block', verticalAlign: 'top' }}>
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
                        key="link"
                        icon="link"
                        label="Link"
                        priority={2}
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
                    itemDataSource={this.props.listItem.dataSource}
                    groupDataSource={this.props.listItem.groups.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.listItemRenderer}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                    selectionMode={this.state.selectionMode ? 'multi' : 'single'}
                    tapBehavior={this.state.selectionMode ? 'toggleSelect' : 'directSelect'}
                    onSelectionChanged={this.handleSelectionChanged}
                    onContentAnimating={this.handleContentAnimating}
                />
            </div>
        )
    }

    renderContentPane(selectedIndex, listItemPaneWidth) {
        if (selectedIndex === null) {
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(listItemPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1 className="win-h1" style={{ color: 'grey' }}>No Selection</h1>
                    </div>
                </div>
            )
        } else {
            let selectedListItem = this.props.listItem.getAt(selectedIndex)
            return (
                <div className="profilePane" style={{ height: '100%', width: Calc100PercentMinus(listItemPaneWidth), display: 'inline-block', verticalAlign: 'top' }}>
                    <div className="profileHeader">
                        <div className="name">{selectedListItem.name}</div>
                        <div className="personInfo">
                            <IconListItem backgroundUrl={selectedListItem.picture} size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {selectedListItem.status}
                                </span>
                                <span className="source">{selectedListItem.statusHoursAgo} hours ago</span>
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
                                    <div className="number">{selectedListItem.mobilePhone}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedListItem.workPhone}</div>
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
                return this.renderListItemPane('100%')
            } else {
                return this.renderContentPane(selectedIndex, 0)
            }
        } else {
            let listItemPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    {this.renderListItemPane(listItemPaneWidth)}
                    {this.renderContentPane(selectedIndex, listItemPaneWidth)}
                </div>
            )
        }
    }
}

ListItemPage.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    listItem: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeListItem: PropTypes.func.isRequired
}

export default ListItemPage
