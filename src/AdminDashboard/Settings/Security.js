import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../Utils/ContentPane'
import Confirmation from '../../Utils/Confirmation'

class Security extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    deleteUser = async () => {
        const isOK = await Confirmation.isOK(this.deleteAccount)
        if (isOK) {
            
        }
    }

    render () {
        return (
            <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                
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
                        <button className="win-button" onClick={this.deleteUser}>Delete</button>
                    </div>
                </div>
                
                <Confirmation 
                    title="Please confirm account deletion"
                    message="Are you certain to delete the account?"
                    reference={el => this.deleteAccount = el} 
                />
            </ContentPane>
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