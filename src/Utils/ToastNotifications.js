
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ToastNotifications extends Component {
    render () {
        return (
            <div className={`toast toast-${this.props.type}`}>
                <div className="toast-title">
                    { this.props.title }
                </div>
                <div className="toast-body">
                    { this.props.body }
                </div>
            </div>
        )
    }
}

ToastNotifications.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default ToastNotifications