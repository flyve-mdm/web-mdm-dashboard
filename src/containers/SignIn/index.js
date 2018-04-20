import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UsernameFieldset from './components/UsernameFieldset'
import withAuthenticationLayout from '../../hoc/withAuthenticationLayout'
import withHandleMessages from '../../hoc/withHandleMessages'
import { fetchSignIn } from '../../store/authentication/actions'
import { I18n } from "react-i18nify"
import publicURL from '../../shared/publicURL'
// Async Component
import AsyncPasswordFieldset from '../../async/asyncPasswordFielset'
import { Redirect } from 'react-router'
import Loading from '../../components/Loading'
import { changeInput, changePhase, handleFormSubmit } from './actions'

function mapStateToProps(state, props) {
    return {
        isLoading: state.ui.loading
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
        if (localStorage.getItem('currentUser') && localStorage.getItem('sessionToken')) {
            return <Redirect to={`${publicURL}/app`}/>
        } else {
            let form
            if (this.state.phase === 1) {
                form = 
                    <UsernameFieldset
                        username={this.state.username} 
                        changeInput={this.changeInput}
                        changePhase={this.changePhase}
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
            return this.props.isLoading ? <div style={{ height: '140px' }}><Loading message={`${I18n.t('commons.loading')}...`} /></div> : form 
        }
    }
}

SignIn.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthenticationLayout(withHandleMessages(SignIn), { centerContent: true }))