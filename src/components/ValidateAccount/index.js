import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withGLPI from '../../hoc/withGLPI'
import config from '../../config/config.json'
import location from '../../shared/location'
import { I18n } from "react-i18nify"

class ValidateAccount extends Component {

    componentWillMount() {
    
        if (this.props.location.pathname.lastIndexOf('validation/') !== -1) {
            const path = this.props.location.pathname.split('validation/')
            const validation = path[path.length-1] ? path[path.length-1] : undefined
            
            if (validation) {
                this.requestValidation(validation)
            }
        }
    }

    requestValidation = async (validation) => {
        const session = await this.props.glpi.initSessionByUserToken({ userToken: config.userToken })
        this.props.glpi.sessionToken = session.session_token
        const validate = await this.props.glpi.addItem({ itemtype: 'PluginFlyvemdmdemoAccountvalidation', input: {_validate: validation}})
        console.log(validate)
    }

    render() {
        return (
            <React.Fragment>
                <h2 className="win-h2">
                    {I18n.t('validate_account.title')}
                </h2>
                <p>
                    {I18n.t('validate_account.message')}
                    <br />
                </p>
                <p>
                    <Link to={`${location.pathname}/`}>{I18n.t('commons.sign_in')}</Link>
                </p>
            </React.Fragment>
        )
    }
}

export default withAuthenticationLayout(withGLPI(ValidateAccount), {
    centerContent: true
})
