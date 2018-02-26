import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UsernameFieldset from './components/UsernameFieldset'
import ToastNotifications from '../../components/ToastNotifications'

import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'

import {
    changeNotificationMessage,
    fetchSignIn
} from '../../store/authentication/actions'

// Async Component
import AsyncPasswordFieldset from '../../asyncComponents/asyncPasswordFielset'
import { Redirect } from 'react-router';

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.currentUser !== null,
        selfRegistration: state.auth.selfRegistration,
        notificationMessage: state.auth.notificationMessage,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeNotificationMessage: bindActionCreators(changeNotificationMessage, dispatch),
        fetchSignIn: bindActionCreators(fetchSignIn, dispatch)
    }
    return { actions }
}

class SignIn extends Component {

    constructor (props) {
        super(props)
        this.state = {
            username: '',
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

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.props.actions.fetchSignIn(
            this.state.username,
            this.state.password
        )
    }

    render () {
        let form
        if (this.state.phase === 1) {
            form = 
                <UsernameFieldset
                    username={this.state.username} 
                    changeInput={this.changeInput}
                    changePhase={this.changePhase}
                    selfRegistration={this.props.selfRegistration}
                />    
        } else {
            form = <AsyncPasswordFieldset
                username={this.state.username}
                password={this.state.password}
                changeInput={this.changeInput}
                changePhase={this.changePhase}
                history={this.props.history}
                handleOnSubmit={this.handleFormSubmit}
            />
        }

        return !this.props.isAuthenticated ?
        (
            <React.Fragment>
                <ToastNotifications ref={instance => { this.toastNotifications = instance }} />
                {form}
            </React.Fragment>
        ) : 
        (
            <Redirect to='/app'/>
        )
    }
}

SignIn.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    selfRegistration: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(SignIn, { centerContent: true }))