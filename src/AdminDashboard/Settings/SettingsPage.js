import React, { Component } from 'react'
import EmptyMessage from '../../Utils/EmptyMessage'
import PropTypes from 'prop-types'

class SettingsPage extends Component {
    render () {
        return (
            <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />            
        )
    }
}

SettingsPage.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default SettingsPage