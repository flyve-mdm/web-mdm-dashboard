import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FleetsList from './FleetsList'
import FleetsPage from './FleetsPage'
export default class Fleets extends Component {

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
                return <FleetsList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList}
                    actionList={this.props.actionList}
                    changeCurrentItem={this.props.changeCurrentItem}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    changeActionList={this.props.changeActionList} />
            } else {
                return <FleetsPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    itemList={this.props.itemList} 
                    actionList={this.props.actionList}
                    changeItemList={this.props.changeItemList}
                    changeActionList={this.props.changeActionList}
                    currentItem={this.props.currentItem}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    changeCurrentItem={this.props.changeCurrentItem} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <FleetsList
                        itemListPaneWidth={itemListPaneWidth}
                        location={this.props.location}
                        sort={this.props.sort}
                        itemList={this.props.itemList}
                        onNavigate={this.props.onNavigate}
                        changeCurrentItem={this.props.changeCurrentItem}
                        changeItemList={this.props.changeItemList}
                        changeSelectionMode={this.changeSelectionMode}
                        actionList={this.props.actionList}
                        selectionMode={this.state.selectionMode}
                        changeActionList={this.props.changeActionList} />
                    <FleetsPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        itemList={this.props.itemList}
                        actionList={this.props.actionList}
                        changeItemList={this.props.changeItemList}
                        changeActionList={this.props.changeActionList}
                        currentItem={this.props.currentItem}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        changeCurrentItem={this.props.changeCurrentItem} />
                </div>
            )
        }
    }
}
Fleets.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    currentItem: PropTypes.object,
    changeCurrentItem: PropTypes.func.isRequired
}
