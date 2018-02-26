import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginUsername from './components/LoginUsername'
import LoginPassword from './components/LoginPassword'
import ToastNotifications from '../../components/ToastNotifications'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import {
    changeCurrentUser,
    changeNotificationMessage,
    changeUsername
} from '../../store/authentication/actions'

function mapStateToProps(state, props) {
    return {
        username: state.auth.username,
        selfRegistration: state.auth.selfRegistration,
        notificationMessage: state.auth.notificationMessage,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeUsername: bindActionCreators(changeUsername, dispatch),
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
        changeCurrentUser: bindActionCreators(changeCurrentUser, dispatch),
    }
    return { actions }
}

class SignIn extends Component {

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

    componentDidUpdate() {
        if (this.props.notificationMessage !== undefined) {
            this.showNotification(this.props.notificationMessage.title, this.props.notificationMessage.body)
        }
    }

    showNotification = (title, body) => {
        if (this.toastNotifications) {
            this.toastNotifications.showNotification(title, body)
        }
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
                changeCurrentUser={this.props.actions.changeCurrentUser}
                history={this.props.history}
                changeNotificationMessage={this.props.actions.changeNotificationMessage}
            />
        }

        return (
            <React.Fragment>
                <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                {form}
            </React.Fragment>
        )
    }
}

SignIn.propTypes = {
    username: PropTypes.string.isRequired,    
    history: PropTypes.object.isRequired,
    selfRegistration: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(SignIn, { centerContent: true }))