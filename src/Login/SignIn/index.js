import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import ErrorValidation from '../../Utils/Forms/ErrorValidation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail, fetchData } from '../DuckController'
import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'


function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading,
        configurationPassword: state.Login.configurationPassword
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch),
        fetchData: bindActionCreators(fetchData, dispatch)
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.props.actions.fetchData('configurationPassword')
        this.state = {
            email: '',
            login: '',
            realName: '',
            password: '',
            passwordConfirmation: '',
            forceValidation: false
        }
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    registerUser = (e) => {
        e.preventDefault()
        const user = this.buildDataArray()
        let isCorrect = true

        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const elements = user[key]
                for (let index = 0; index < elements[0].length; index++) {
                    const element = elements[0][index]
                    if (!ErrorValidation.validation(element.parametersToEvaluate, element.value).isCorrect) 
                        isCorrect = false
                }
            }
        }
        
        if (isCorrect) {
            this.props.history.push('/')
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    buildDataArray = () => {
        const dataArray = {
            personalInformation: [
                [
                    {
                        label: "Email",
                        type: "email",
                        name: "email",
                        value: this.state.email,
                        placeholder: "Your email",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            isEmail: true
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "User name",
                        type: "text",
                        name: "login",
                        value: this.state.login,
                        placeholder: "Your user name",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "Real name",
                        type: "text",
                        name: "realName",
                        value: this.state.realName,
                        placeholder: "Your name",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true
                        },
                        forceValidation: this.state.forceValidation
                    }
                ]
            ],
            passwordInformation: [
                [
                    {
                        label: "Password",
                        type: "password",
                        name: "password",
                        value: this.state.password,
                        placeholder: "Password",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            minimunLength: this.props.configurationPassword.minimun_length,
                            needDigit: this.props.configurationPassword.need_digit,
                            needLowercaseCharacter: this.props.configurationPassword.need_lowercase_character,
                            needUppercaseCharacter: this.props.configurationPassword.need_uppercase_character,
                            needSymbol: this.props.configurationPassword.need_symbol
                        },
                        forceValidation: this.state.forceValidation
                    },
                    {
                        label: "Password (confirmation)",
                        type: "password",
                        name: "passwordConfirmation",
                        value: this.state.passwordConfirmation,
                        placeholder: "Password confirmation",
                        function: this.changeState,
                        disabled: false,
                        style: {
                            width: 340
                        },
                        parametersToEvaluate: {
                            isRequired: true,
                            minimunLength: this.props.configurationPassword.minimun_length,
                            needDigit: this.props.configurationPassword.need_digit,
                            needLowercaseCharacter: this.props.configurationPassword.need_lowercase_character,
                            needUppercaseCharacter: this.props.configurationPassword.need_uppercase_character,
                            needSymbol: this.props.configurationPassword.need_symbol,
                            isEqualTo: {
                                value: this.state.password,
                                message: "Passwords do not match"
                            }
                        },
                        forceValidation: this.state.forceValidation
                    }
                ]
            ] 
            
        }
        return dataArray
    }

    render() {
        const user = this.buildDataArray()

        let renderComponent 
        if (this.props.isLoading) {
            renderComponent = <Loading message="Loading..."/>
        } else {
            renderComponent = (
                <LoginContainer centerContent={false} >
                    <h2 style={{
                        textAlign: 'center'
                    }}>
                        Create account
                    </h2>

                    <form className="list-content" onSubmit={this.registerUser}>

                        <ConstructInputs data={user.personalInformation} />

                        <ConstructInputs data={user.passwordInformation}  />

                        <div style={{textAlign: 'center'}}>
                            <button className="win-button win-button-primary" style={{ margin: "20px" }}>
                                Register
                            </button>
                        </div>
                    </form>
                </LoginContainer>
            )
        }

        return renderComponent
    }
}

SignIn.propTypes = {
    email: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    configurationPassword: PropTypes.object.isRequired    
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
