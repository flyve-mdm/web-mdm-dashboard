import React from 'react'
import { I18n } from 'react-i18nify'
import ContentPane from '../../../../components/ContentPane'

const Contact = () => (
    <ContentPane>
        <h2>{ I18n.t('about.contact.title') }</h2>
        <div className="aboutPane">
            <img src="images/logo-teclib.png" alt="Teclib" />
            <p>
                { I18n.t('about.contact.description') }                
            </p>
            <div className="separator" />
            <div className="contentInfo" >
                <ul className="contact-list__ul">
                    <li>
                        <span className="phoneIcon" />
                        <div className="callContent">
                            <div>{ I18n.t('commons.email') }</div>
                            <a href="mailto:contact@teclib.com">contact@teclib.com</a>
                        </div>
                    </li>
                    <li>
                        <span className="phoneIcon" />
                        <div className="callContent">
                            <div>{ I18n.t('commons.call') }</div>
                            <a href="tel:+34512702140">+34512702140</a>
                        </div>
                    </li>
                    <li>
                        <span className="mapIcon" />
                        <div className="callContent">
                            <div>{ I18n.t('commons.map') }</div>
                            <a href="https://goo.gl/maps/qDijeVyCUwq">Barcelona, { I18n.t('commons.Spain') }</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </ContentPane>
)

export default Contact