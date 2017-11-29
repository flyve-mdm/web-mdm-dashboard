import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsList from './ApplicationsList'
import ApplicationsPage from './ApplicationsPage'

export default class Applications extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectionMode: false
        }
    }

    changeSelectionMode = (selectionMode) => {
        this.setState({
            selectionMode
        })
    }

    render() {

        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null && this.props.actionList === null) {
                return <ApplicationsList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    actionList={this.props.actionList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList}
                    changeActionList={this.props.changeActionList} />
            } else {
                return <ApplicationsPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    location={this.props.location}
                    itemList={this.props.itemList}
                    actionList={this.props.actionList}
                    changeSelectionMode={this.changeSelectionMode}
                    changeItemList={this.props.changeItemList}
                    onNavigate={this.props.onNavigate}
                    changeActionList={this.props.changeActionList} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <ApplicationsList
                        itemListPaneWidth={itemListPaneWidth}
                        location={this.props.location}
                        sort={this.props.sort}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        actionList={this.props.actionList}
                        itemList={this.props.itemList}
                        onNavigate={this.props.onNavigate}
                        changeItemList={this.props.changeItemList}
                        changeActionList={this.props.changeActionList} />
                    <ApplicationsPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        location={this.props.location}
                        itemList={this.props.itemList}
                        actionList={this.props.actionList}
                        changeSelectionMode={this.changeSelectionMode}
                        changeItemList={this.props.changeItemList}
                        onNavigate={this.props.onNavigate}
                        changeActionList={this.props.changeActionList} />
                </div>
            )
        }
    }
}
Applications.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string
}
