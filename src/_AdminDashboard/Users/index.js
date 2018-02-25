import React, { Component } from "react"
import PropTypes from 'prop-types'
import UsersList from './UsersList'
import UsersPage from './UsersPage'

export default class Users extends Component {

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
        let selectedItemList = this.props.location.length === 2 ? this.props.location[1] : null
        if (this.props.mode === 'small') {
            if (selectedItemList === null && this.props.actionList === null) {
                return <UsersList
                    itemListPaneWidth={'100%'}
                    animation={this.props.animation}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    actionList={this.props.actionList}
                    changeActionList={this.props.changeActionList}
                    showNotification={this.props.showNotification} 
                    glpi={this.props.glpi} />
            } else {
                return <UsersPage
                itemListPaneWidth={0}
                animation={this.props.animation}
                location={this.props.location}
                onNavigate={this.props.onNavigate}
                selectedItemList={selectedItemList}
                changeSelectionMode={this.changeSelectionMode}
                actionList={this.props.actionList}
                changeActionList={this.props.changeActionList}
                showNotification={this.props.showNotification} 
                glpi={this.props.glpi} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <UsersList
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} 
                        showNotification={this.props.showNotification} 
                        glpi={this.props.glpi}
                    />
                    <UsersPage
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        selectedItemList={selectedItemList}
                        changeSelectionMode={this.changeSelectionMode}
                        actionList={this.props.actionList}
                        changeActionList={this.props.changeActionList} 
                        showNotification={this.props.showNotification} 
                        glpi={this.props.glpi}
                    />
                </div>
            )
        }
    }
}
Users.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    changeCurrentItem: PropTypes.func.isRequired,
    changeActionList: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
