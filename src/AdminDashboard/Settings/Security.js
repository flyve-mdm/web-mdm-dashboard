import React, { Component } from 'react'
// import ReactWinJS from 'react-winjs'
import Calc100PercentMinus from '../../Utils/Calc100PercentMinus'
import PropTypes from 'prop-types'

class Security extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <div className="contentPane" style={{ width: Calc100PercentMinus(this.props.itemListPaneWidth) }}>
                
                <h2 className="win-h2"> Security </h2>
                      
                {/* <div className="title">Show in dashboard </div> */}

                <div className="listElement">
                    <div className="message">
                        Password
                        <div className="detail">Change your FlyveMDM Account password</div>
                    </div>
                    <div className="controller">
                        <button className="win-button">Edit</button>
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Kill session
                        <div className="detail">Destroy the session identified by your session token</div>
                    </div>
                    <div className="controller">
                        <button className="win-button">Logout</button>
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Delete browser data
                        <div className="detail">Delete Web Storage and Indexed Database</div>
                    </div>
                    <div className="controller">
                        <button className="win-button">Delete</button>
                    </div>
                </div>

                <div className="listElement">
                    <div className="message">
                        Delete account
                        <div className="detail">This action remove all information related to the user and the entity</div>
                    </div>
                    <div className="controller">
                        <button className="win-button">Delete</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

Security.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}

export default Security