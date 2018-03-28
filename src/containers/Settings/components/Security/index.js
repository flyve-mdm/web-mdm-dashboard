import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Confirmation from '../../../../components/Confirmation'
import ErrorValidation from '../../../../components/ErrorValidation'
import ConstructInputs from '../../../../components/Forms'
import Loading from '../../../../components/Loading'
import { bindActionCreators } from 'redux'
import { uiSetNotification } from '../../../../store/ui/actions'
import { connect } from 'react-redux'
import { fetchPasswordConfiguration } from '../../../../store/authentication/actions';
import ContentPane from '../../../../components/ContentPane'

function mapDispatchToProps(dispatch) {
    const actions = {
        setNotification: bindActionCreators(uiSetNotification, dispatch),
        fetchPasswordConfiguration: bindActionCreators(fetchPasswordConfiguration, dispatch)
    }
    return { actions }
}

class Security extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            passwordConfirmation: '',
            forceValidation: false
        }
    }

    deleteUser = async () => {
        const isOK = await Confirmation.isOK(this.deleteAccount)
        if (isOK) {
            this.props.actions.setNotification({
                title: 'Successfully',
                body: 'User deleted!',
                type: 'info'
            })
        }
    }

    closeSession  = async () => {
        const isOK = await Confirmation.isOK(this.killSession)
        if (isOK) {
            this.props.actions.setNotification({
                title: 'Successfully',
                body: 'Session closed!',
                type: 'info'
            })
        }
    }

    cleanWebStorage  = async () => {
        const isOK = await Confirmation.isOK(this.deleteBrowserData)
        if (isOK) {
            this.props.actions.setNotification({
                title: 'Successfully',
                body: 'Web storage and database indexed, cleaned',
                type: 'info'
            })
        }
    }

    savePassword = () => {
        this.setState({ forceValidation: true })
    }

    savePassword = (e) => {
        e.preventDefault()
        const password = this.buildDataArray()
        let isCorrect = true

        for (const key in password) {
            if (password.hasOwnProperty(key)) {
                const elements = password[key]
                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index]
                    console.log(element.value)
                    if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                        isCorrect = false
                }
            }
        }

        if (isCorrect) {
            this.changeMode('')
            this.props.actions.setNotification({
                title: 'Successfully',
                body: 'New password saved!',
                type: 'info'
            })
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    changeState = (name, value) => { 
        this.setState({
            [name]: value
        })
    }

    changeMode = (mode) => {
        if (mode === 'Change password') {
            this.props.actions.fetchPasswordConfiguration()
        }
        this.setState({ 
            forceValidation: false,
            mode 
        })
    }

    buildDataArray = () => {
        return [
            [
                {
                    label: "Password",
                    type: "password",
                    name: "password",
                    value: this.state.password,
                    placeholder: "Password",
                    function: this.changeState,
                    parametersToEvaluate: { 
                        isRequired: true,
                        minimunLength: this.props.passwordConfiguration.minimun_length,
                        needDigit: this.props.passwordConfiguration.need_digit,
                        needLowercaseCharacter: this.props.passwordConfiguration.need_lowercase_character,
                        needUppercaseCharacter: this.props.passwordConfiguration.need_uppercase_character,
                        needSymbol: this.props.passwordConfiguration.need_symbol
                    },
                    forceValidation: this.state.forceValidation,
                    disabled: false,
                    style: null
                }
            ],
            [
                {
                    label: "Password (confirmation)",
                    type: "password",
                    name: "passwordConfirmation",
                    value: this.state.passwordConfirmation,
                    placeholder: "Password confirmation",
                    function: this.changeState,
                    parametersToEvaluate: { 
                        isRequired: true,
                        minimunLength: this.props.passwordConfiguration.minimun_length,
                        needDigit: this.props.passwordConfiguration.need_digit,
                        needLowercaseCharacter: this.props.passwordConfiguration.need_lowercase_character,
                        needUppercaseCharacter: this.props.passwordConfiguration.need_uppercase_character,
                        needSymbol: this.props.passwordConfiguration.need_symbol,
                        isEqualTo: {
                            value: this.state.password,
                            message: "Passwords do not match"
                        }
                    },
                    forceValidation: this.state.forceValidation,
                    disabled: false,
                    style: null
                }
            ]
        ]
    }

    render () {
        if (this.props.isLoading) {
            return (
                <div>
                    <Loading message="Loading..."/> 
                </div>
            )
        }

        switch (this.state.mode) {
            case 'Change password':
                return (
                    <ContentPane>
                        <h2 className="win-h2"> {this.state.mode} </h2>

                        <form className="list-content" onSubmit={this.savePassword}>
    
                            <ConstructInputs data={this.buildDataArray()} />

                            <br/>

                            <button className="win-button" 
                                type="button"
                                style={{marginRight: 10}} 
                                onClick={() => this.changeMode("")}
                            >
                                Cancel
                            </button>

                            <button className="win-button">
                                Save
                            </button>

                        </form>

                    </ContentPane>
                )
            default:
                return (
                    <ContentPane>
                        <h2 style={{marginBottom: '20px'}}>Security</h2>
                        
                        <div className="listElement">
                            <div className="message">
                                Password
                                <div className="detail">Change your FlyveMDM Account password</div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={() => this.changeMode('Change password')}>
                                    Edit
                                </button>
                            </div>
                        </div>
        
                        <div className="listElement">
                            <div className="message">
                                Kill session
                                <div className="detail">Destroy the session identified by your session token</div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={this.closeSession}>Logout</button>
                            </div>
                        </div>

                        <Confirmation 
                            title="Kill session"
                            message="Are you sure you want to close your session?"
                            reference={el => this.killSession = el} 
                        />
        
                        <div className="listElement">
                            <div className="message">
                                Delete browser data
                                <div className="detail">Delete Web Storage and Indexed Database</div>
                            </div>
                            <div className="controller">
                                <button className="win-button" onClick={this.cleanWebStorage}>Delete</button>
                            </div>
                        </div>

                        <Confirmation 
                            title="Delete browser data"
                            message="Are you sure you want to delete all data/information in the web storage and indexed database?"
                            reference={el => this.deleteBrowserData = el} 
                        />
        
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
                            title="Account deletion"
                            message="Are you certain to delete the account?"
                            reference={el => this.deleteAccount = el} 
                        />
                    </ContentPane>            
                )
        }
    }
}

Security.propTypes = {
    actions: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps)(Security)
