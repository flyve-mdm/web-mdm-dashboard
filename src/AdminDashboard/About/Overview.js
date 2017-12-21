import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'

export default class Overview extends Component {
    render() {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                <h2 className="win-h2 titleContentPane">{this.props.title}</h2>
                <div className="aboutPane">
                    <p>
                        Flyve MDM is a mobile device management software that enables you to secure and manage all the mobile devices of your business via a unique web-based console (MDM).
                    </p>
                    <p>
                        Our solution allows you to efficiently and easily control any aspects of your Android-based mobile fleet, providing a panel of functionalities:
                    </p>
                    <ul>
                        <li>Provided as a SaaS platform</li>
                        <li>Google independent</li>
                        <li>Deploy and configure applications</li>
                        <li>Deploy files</li>
                        <li>Wipe a phone</li>
                        <li>Work with devices running Android 4.4 or higher</li>
                        <li>Simple web application user interface</li>
                    </ul>
                    <p>
                        Source codes will be released during  fall 2016.
                    </p>
                </div>
            </ContentPane>
        )
    }
}
Overview.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    title: PropTypes.string.isRequired
}