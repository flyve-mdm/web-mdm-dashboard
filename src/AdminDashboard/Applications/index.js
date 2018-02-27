import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApplicationsList from './ApplicationsList'
import ApplicationsPage from './ApplicationsPage'

export default class Applications extends Component {

        constructor(props) {
        super(props)
        this.state = {
            selectionMode: false,
            action: null
        }
    }

    changeAction = action => this.setState({ action })
    changeSelectionMode = selectionMode => this.setState({ selectionMode })

    render() {

        let selectedItemList = this.props.location.length === 2 ? this.props.location[1] : null
        if (this.props.mode === 'small') {
            if (selectedItemList === null && this.props.actionList === null) {
                return <ApplicationsList
                    itemListPaneWidth={'100%'}
                    animation={this.props.animation}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    changeSelectionMode={this.changeSelectionMode}
                    selectionMode={this.state.selectionMode}
                    action={this.state.action}
                    changeAction={this.changeAction}
                    showNotification={this.props.showNotification}
                    glpi={this.props.glpi} />
            } else {
                return <ApplicationsPage 
                    itemListPaneWidth={0}
                    animation={this.props.animation}
                    location={this.props.location}
                    onNavigate={this.props.onNavigate}
                    selectedItemList={selectedItemList}
                    changeSelectionMode={this.changeSelectionMode}
                    action={this.state.action}
                    changeAction={this.changeAction}
                    showNotification={this.props.showNotification}
                    glpi={this.props.glpi} />
            }
        } else {
            let itemListPaneWidth = 320
            return (
                <div style={{ height: '100%' }}>
                    <ApplicationsList
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        changeSelectionMode={this.changeSelectionMode}
                        selectionMode={this.state.selectionMode}
                        action={this.state.action}
                        changeAction={this.changeAction}
                        showNotification={this.props.showNotification}
                        glpi={this.props.glpi}
                    />
                    <ApplicationsPage 
                        itemListPaneWidth={itemListPaneWidth}
                        animation={this.props.animation}
                        location={this.props.location}
                        onNavigate={this.props.onNavigate}
                        selectedItemList={selectedItemList}
                        changeSelectionMode={this.changeSelectionMode}
                        action={this.state.action}
                        changeAction={this.changeAction}
                        showNotification={this.props.showNotification}
                        glpi={this.props.glpi}
                    />
                </div>
            )
        }
    }
}
Applications.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
