import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactWinJS from 'react-winjs'
import { I18n } from 'react-i18nify'

/** Component with a dialogue box */
class Confirmation extends PureComponent {

    /** 
     * Asynchronous function that waits for a user's response
     * @return {boolean} User's response
     */
    static isOK = async (contentDialog) => {
        return await contentDialog.winControl.show().then(({ result }) => {
            return result === "primary"
        })
    }
    
    /** Render component */
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