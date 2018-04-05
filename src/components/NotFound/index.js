import React from 'react'
import { I18n } from 'react-i18nify'

const NotFound = props => {

    return (
        <div className="authentication-block " style={{ textAlign: 'center'}} >
            <section className="authentication__section">
                <figure className="authentication__figure">
                    <img alt="Flyve MDM Dashboard" src="/images/dashboard.svg" />
                </figure>
                <h1>{I18n.t('commons.not_found')}</h1>
                <h1>404</h1>
            </section>
            <footer className="authenticaton__footer">
                <a href="https://flyve-mdm.com/privacy-policy/">
                    {I18n.t('commons.terms_and_conditions')}
                </a>
                <br />

                <span>
                    © 2017 - 2018 Teclib'.
                    </span>
                <br />
            </footer>
        </div>
    )
}

export default NotFound