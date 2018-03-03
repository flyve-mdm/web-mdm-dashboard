import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import { I18n } from 'react-i18nify';

export default class Contact extends Component {
    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2 titleContentPane">{this.props.title}</h2>
                <div className="aboutPane">
                    <img src="images/logo-teclib.png" alt="Teclib" />
                    <p>
                        { I18n.t('about.contact_STRINGS.feel_free_to_contact_us_at_any_time,_selecting_your_preferred_channel_a_teclib’_expert_will_answer_your_request_and_provide_you_with_all_the_information_and_advice_you_need_about:_our_products,_partnership_programs,_training_courses_and_support_solutions') }
                    </p>
                    <div className="separator" />
                    <div className="contentInfo">
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
                                    <a href="https://goo.gl/maps/qDijeVyCUwq">Barcelona, Spain</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentPane>
        )
    }
}
Contact.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired
}