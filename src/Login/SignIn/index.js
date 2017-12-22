import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConstructInputs from '../../Utils/Forms'
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

    registerUser = (e) => {
        e.preventDefault()
        let isCorrect = true
        if (this.props.configurationPassword.minimun_length) {
            if (this.state.password.length < this.props.configurationPassword.minimun_length) isCorrect = false 
        }
        if (this.props.configurationPassword.need_digit) {
            const myRe = /[\d]/g
            if (!myRe.test(this.state.password)) isCorrect = false
        }
        if (this.props.configurationPassword.need_uppercase_character) {
            const myRe = /[a-z]/g
            if (!myRe.test(this.state.password)) isCorrect = false
        }
        if (this.props.configurationPassword.need_uppercase_character) {
            const myRe = /[A-Z]/g
            if (!myRe.test(this.state.password)) isCorrect = false
        }
        if (this.props.configurationPassword.need_symbol) {
            const myRe = /[!@#%^&*?><)(+=._\-\\[\]^~`'"˜$ˆ/:;{}|]/g
            if (!myRe.test(this.state.password)) isCorrect = false
        }
        if (this.state.password !== this.state.passwordConfirmation) isCorrect = false   
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
                        required: true,
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
                        required: true,
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
                        required: true,
                        disabled: false,
                        style: {
                            width: 340
                        }
                    }
                ]
            ] 
            
        }

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
    configurationPassword: PropTypes.object.isRequired    
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(SignIn)    
