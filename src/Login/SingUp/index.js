import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { changeUsername, changeNotificationMessage } from '../DuckController'
import { connect } from 'react-redux'
import LoginContainer from '../LoginContainer'
import LoginUsername from './LoginUsername'
import LoginPassword from './LoginPassword'
import ToastNotifications from '../../Utils/ToastNotifications'

function mapStateToProps(state, props) {
    return {
        username: state.Login.username,
        selfRegistration: state.Login.selfRegistration,
        notificationMessage: state.Login.notificationMessage
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeUsername: bindActionCreators(changeUsername, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
    }
    return { actions }
}

class Login extends Component {

    constructor (props) {
        super(props)
        this.state = {
            username: this.props.username,
            password: '',
            phase: 1
        }
    }

    componentDidMount() {
        if (this.props.notificationMessage !== undefined) {
            this.showNotification(this.props.notificationMessage.title, this.props.notificationMessage.body)
        }
    }

    showNotification = (title, body) => {
        if (this.toastNotifications) this.toastNotifications.showNotification(title, body)
        this.props.actions.changeNotificationMessage(undefined)
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
                <LoginUsername 
                    username={this.state.username} 
                    changeInput={this.changeInput}
                    changePhase={this.changePhase}
                    changeUsername={this.props.actions.changeUsername}
                    selfRegistration={this.props.selfRegistration}
                />    
        } else {
            form = 
            <LoginPassword 
                username={this.state.username} 
                password={this.state.password}
                changeInput={this.changeInput}
                changePhase={this.changePhase}
                history={this.props.history}
            />
        }
        return (
            <LoginContainer>
                <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                {form}
            </LoginContainer>
        )
    }
}

Login.propTypes = {
    username: PropTypes.string.isRequired,    
    history: PropTypes.object.isRequired,
    selfRegistration: PropTypes.bool.isRequired
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)