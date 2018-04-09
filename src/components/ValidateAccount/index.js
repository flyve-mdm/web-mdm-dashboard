import React from 'react'
import { Link } from 'react-router-dom'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import location from '../../shared/location'
import { I18n } from "react-i18nify"

const ValidateAccount = () => {
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

export default withAuthenticationLayout(ValidateAccount, {
    centerContent: true
})
