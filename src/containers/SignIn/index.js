import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UsernameFieldset from './components/UsernameFieldset'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import {
    fetchSignIn
} from '../../store/authentication/actions'
import { I18n } from "react-i18nify"

// Async Component
import AsyncPasswordFieldset from '../../async/asyncPasswordFielset'
import { Redirect } from 'react-router';
import Loading from '../../components/Loading';
import { changeInput, changePhase, handleFormSubmit } from './actions';

function mapStateToProps(state, props) {
    return {
        isAuthenticated: state.auth.currentUser ? true : false,
        isLoading: state.ui.loading,        
        selfRegistration: state.auth.selfRegistration
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
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
            return this.props.isLoading ? <Loading message={`${I18n.t('commons.loading')}...`}/> : form 
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