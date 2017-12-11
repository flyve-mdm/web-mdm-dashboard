import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'

class Confirmation extends Component {

    static isOK = async (contentDialog) => {
        return await contentDialog.winControl.show().then(({ result }) => {
            return result === "primary"
        })
    }

    render () {
        return (
            <ReactWinJS.ContentDialog
                ref={this.props.reference}
                title={this.props.title}
                primaryCommandText="OK"
                secondaryCommandText="Cancel">
                    <div>{ this.props.message }</div>
            </ReactWinJS.ContentDialog>
        )
    }
}

Confirmation.propTypes = {
    reference: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default Confirmation