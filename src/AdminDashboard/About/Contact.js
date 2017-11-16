import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
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
        )
    }
}
