import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail } from '../DuckController'
// import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'


function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch)
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.state = {
            login: '',
            realName: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    changeState = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const user = {
            personalInformation: [
                [
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
                        }
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
                        }
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
                        }
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
                        }
                    }
                ]
            ] 
            
        }

        return (
            <LoginContainer centerContent={false} >
                <h2 style={{
                    textAlign: 'center'
                }}>
                    Create account
                </h2>

                <form className="list-content">

                    <ConstructInputs data={user.personalInformation} />

                    <ConstructInputs data={user.passwordInformation}  />

                    <div style={{textAlign: 'center'}}>
                        <button className="win-button win-button-primary" style={{ margin: "20px" }} onClick={this.saveChanges}>
                            Register
                        </button>
                    </div>
                </form>
            </LoginContainer>
        )
    }
}

SignIn.propTypes = {
    email: PropTypes.string,
    isLoading: PropTypes.bool.isRequired
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
