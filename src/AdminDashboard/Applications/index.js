import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsList from './ApplicationsList'
import ApplicationsPage from './ApplicationsPage'

export default class Applications extends Component {

    render() {

        let selectedIndex = this.props.location.index !== null ? this.props.location.index : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <ApplicationsList
                    itemListPaneWidth={'100%'}
                    location={this.props.location}
                    sort={this.props.sort}
                    itemList={this.props.itemList}
                    onNavigate={this.props.onNavigate}
                    changeItemList={this.props.changeItemList} />
            } else {
                return <ApplicationsPage itemListPaneWidth={0}
                    location={this.props.location}
                    selectedIndex={selectedIndex}
                    itemList={this.props.itemList} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <ApplicationsList
                        itemListPaneWidth={itemListPaneWidth}
                        location={this.props.location}
                        sort={this.props.sort}
                        itemList={this.props.itemList}
                        onNavigate={this.props.onNavigate}
                        changeItemList={this.props.changeItemList} />
                    <ApplicationsPage 
                        itemListPaneWidth={itemListPaneWidth}
                        location={this.props.location}
                        selectedIndex={selectedIndex}
                        itemList={this.props.itemList} />
                </div>
            )
        }
    }
}
Applications.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired
}
