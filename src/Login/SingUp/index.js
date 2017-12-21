import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { changeEmail } from '../DuckController'
import { connect } from 'react-redux'
import LoginContainer from '../LoginContainer'
import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'

function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        selfRegistration: state.Login.selfRegistration
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch)
    }
    return { actions }
}

class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            email: this.props.email,
            password: '',
            phase: 1
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changePhase = (newPhase) => {
        this.setState({
            phase: newPhase
        })
    }

    render () {
        let form
        if (this.state.phase === 1) {
            form = 
                <LoginEmail 
                    email={this.state.email} 
                    changeInput={this.changeInput}
                    changePhase={this.changePhase}
                    changeEmail={this.props.actions.changeEmail}
                    selfRegistration={this.props.selfRegistration}
                />    
        } else {
            form = 
            <LoginPassword 
                email={this.state.email} 
                password={this.state.password}
                changeInput={this.changeInput}
                changePhase={this.changePhase}
                history={this.props.history}
            />
        }
        return (
            <LoginContainer>
                {form}
            </LoginContainer>
        )
    }
}

Login.propTypes = {
    email: PropTypes.string.isRequired,    
    history: PropTypes.object.isRequired,
    selfRegistration: PropTypes.bool.isRequired
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)