import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import { I18n } from 'react-i18nify'

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
                primaryCommandText={I18n.t('commons.ok')}
                secondaryCommandText={I18n.t('commons.cancel')}
            >
                    <p>{ this.props.message }</p>
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