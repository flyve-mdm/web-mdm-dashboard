import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'

export default class Contact extends Component {
    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2 titleContentPane">{this.props.title}</h2>
                <div className="aboutPane">
                    <img src="images/logo-teclib.png" alt="Teclib" />
                    <p>
                        Feel free to contact us at any time, selecting your preferred channel. A Teclib’ expert will answer your request and provide you with all the information and advice you need about: our Products, Partnership Programs, Training Courses and Support solutions.
                    </p>
                    <div className="separator" />
                    <div className="contentInfo">
                        <ul>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <div>Email</div>
                                    <a href="mailto:contact@teclib.com">contact@teclib.com</a>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <div>Call</div>
                                    <a href="tel:+34512702140">+34512702140</a>
                                </div>
                            </li>
                            <li>
                                <span className="mapIcon" />
                                <div className="callContent">
                                    <div>Map</div>
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