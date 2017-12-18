import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { changeLoading, changeValue } from '../DuckController'
import { connect } from 'react-redux'
import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'

function mapStateToProps(state, props) {
    return {
        phase: state.Login.phase,
        email: state.Login.email,
        password: state.Login.password
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeValue: bindActionCreators(changeValue, dispatch),
        changeLoading: bindActionCreators(changeLoading, dispatch)
    }
    return { actions }
}

class Login extends Component {
    
    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            phase: 1
        }
    }

    render () {
        let form
        if (this.props.phase === 1) {
            form = 
                <LoginEmail 
                    email={this.props.email} 
                    changeValue={this.props.actions.changeValue}
                    changeLoading={this.props.actions.changeLoading}
                />    
        } else {
            form = 
            <LoginPassword 
                email={this.props.email} 
                password={this.props.password} 
                changeValue={this.props.actions.changeValue}
                changeLoading={this.props.actions.changeLoading}
                history={this.props.history}
            />
        }
        return (
            <div id="LoginForm">
                <img alt="" src="images/logo2.png" className="img-login"/>

                {form}

                <div className="credentials">
                    <a href="https://flyve-mdm.com/privacy-policy/">Terms and Conditions</a>
                    <br />
                    <span>
                        © 2017 Teclib'.
                    </span>
                </div>
            </div>
            
        )
    }
}
export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Login)