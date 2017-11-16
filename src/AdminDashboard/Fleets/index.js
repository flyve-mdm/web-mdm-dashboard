import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FleetsList from './FleetsList'
import FleetsPage from './FleetsPage'

export default class Fleets extends Component {

    render() {

        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <FleetsList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList} />
            } else {
                return <FleetsPage itemListPaneWidth={0}
                    selectedIndex={selectedIndex}
                    itemList={this.props.itemList} />
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
                        changeItemList={this.props.changeItemList} />
                    <FleetsPage itemListPaneWidth={itemListPaneWidth}
                        selectedIndex={selectedIndex}
                        itemList={this.props.itemList} />
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
