import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesList from './FilesList'
import FilesPage from './FilesPage'

export default class Files extends Component {

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
                return <FilesList
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
                return <FilesPage 
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
                    <FilesList
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
                    <FilesPage 
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
Files.propTypes = {
    mode: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
    animation: PropTypes.bool.isRequired,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
