import React, { Component } from "react"
import PropTypes from 'prop-types'
import ItemListPane from './ItemListPane'
import ContentPane from './ContentPane'

class UsersPage extends Component {

    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <ItemListPane itemListPaneWidth="100%" location={this.props.location} onNavigate={this.props.onNavigate} itemList={this.props.itemList} sort={this.props.sort} />
            } else {
                return <ContentPane selectedIndex={selectedIndex} itemListPaneWidth="0"/>
            }
        } else {
            return (
                <div style={{ height: '100%' }}>
                    <ItemListPane itemListPaneWidth="320" location={this.props.location} onNavigate={this.props.onNavigate} itemList={this.props.itemList} sort={this.props.sort} />
                    <ContentPane selectedIndex={selectedIndex} itemListPaneWidth="320"/>
                </div>
            )
        }
    }
}

UsersPage.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    sort: PropTypes.bool.isRequired,
    itemList: PropTypes.object.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    changeItemList: PropTypes.func.isRequired
}

export default UsersPage
