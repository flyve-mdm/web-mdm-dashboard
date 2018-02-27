import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UsernameFieldset from './components/UsernameFieldset'

import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'

import {
    changeNotificationMessage,
    fetchSignIn
} from '../../store/authentication/actions'

// Async Component
import AsyncPasswordFieldset from '../../asyncComponents/asyncPasswordFielset'
import { Redirect } from 'react-router';
import Loading from '../../components/Loading';
import { changeInput, changePhase, handleFormSubmit } from './actions';

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.currentUser !== null,
        isLoading: state.ui.loading,        
        selfRegistration: state.auth.selfRegistration,
        notificationMessage: state.auth.notificationMessage
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

        this.changeInput = event => changeInput(this, event.target)
        this.changePhase = newPhase => changePhase(this, newPhase)
        this.handleFormSubmit = event => handleFormSubmit(this, event)
    }

    render () {
        if (this.props.isAuthenticated) {
            return <Redirect to='/app'/>
        } else {
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
            return this.props.isLoading ? <Loading message="Loading..."/> : form 
        }
    }
}

SignIn.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    selfRegistration: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(SignIn, { centerContent: true }))