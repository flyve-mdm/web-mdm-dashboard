import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { changeUsername, changeNotificationMessage, changeCurrentUser } from '../DuckController'
import { connect } from 'react-redux'
import LoginContainer from '../LoginContainer'
import LoginUsername from './LoginUsername'
import LoginPassword from './LoginPassword'
import ToastNotifications from '../../Utils/ToastNotifications'
import I18n from '../../i18n';

function mapStateToProps(state, props) {
    return {
        username: state.Login.username,
        selfRegistration: state.Login.selfRegistration,
        notificationMessage: state.Login.notificationMessage,
        locationLanguage: state.Login.locationLanguage
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

    componentDidUpdate() {
        if (this.props.notificationMessage !== undefined) {
            this.showNotification(this.props.notificationMessage.title, this.props.notificationMessage.body)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.locationLanguage !== this.props.locationLanguage) {
            I18n.setLocale(nextProps.locationLanguage);
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
                changeCurrentUser={this.props.actions.changeCurrentUser}
                history={this.props.history}
                changeNotificationMessage={this.props.actions.changeNotificationMessage}
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