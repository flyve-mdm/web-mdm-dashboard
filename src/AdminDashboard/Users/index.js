import React, { Component } from "react"
import PropTypes from 'prop-types'
import ItemListPane from './ItemListPane'
import ContentPane from './ContentPane'

class UsersPage extends Component {

    render() {
        let selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null

        if (this.props.mode === 'small') {
            if (selectedIndex === null) {
                return <ItemListPane 
                        itemListPaneWidth="100%" 
                        changeItemList={this.props.changeItemList} 
                        location={this.props.location} 
                        onNavigate={this.props.onNavigate} 
                        itemList={this.props.itemList} 
                        sort={this.props.sort} 
                        changeActionList={this.props.changeActionList}
                        fetchData={this.props.fetchData}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError} />
            } else {
                return <ContentPane 
                        selectedIndex={selectedIndex} 
                        itemListPaneWidth={0} 
                        itemList={this.props.itemList}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} />
            }
        } else {
            return (
                <div style={{ height: '100%' }}>
                    <ItemListPane 
                        itemListPaneWidth={320} 
                        changeItemList={this.props.changeItemList} 
                        location={this.props.location} 
                        onNavigate={this.props.onNavigate} 
                        itemList={this.props.itemList} 
                        sort={this.props.sort} 
                        changeActionList={this.props.changeActionList} 
                        fetchData={this.props.fetchData}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError} />
                    <ContentPane 
                        selectedIndex={selectedIndex} 
                        itemListPaneWidth={320} 
                        itemList={this.props.itemList} 
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} />
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
    changeItemList: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string
}

export default UsersPage
