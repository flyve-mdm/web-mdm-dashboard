import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FleetsList from './FleetsList'
import FleetsPage from './FleetsPage'

export default class Fleets extends Component {

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
                    changeActionList={this.props.changeActionList} />
            } else {
                return <FleetsPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    location={this.props.location}
                    itemList={this.props.itemList} 
                    actionList={this.props.actionList} />
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
                        changeItemList={this.props.changeItemList} 
                        changeActionList={this.props.changeActionList} />
                    <FleetsPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        location={this.props.location}
                        itemList={this.props.itemList}
                        actionList={this.props.actionList} />
                </div>
            )
        }
    }
}
Fleets.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired
}
