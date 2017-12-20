import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeEmail } from '../DuckController'
import Loading from '../../Utils/Loading'
import LoginContainer from '../LoginContainer'


function mapStateToProps(state, props) {
    return {
        email: state.Login.email,
        isLoading: state.Login.isLoading,
        isRecoverPasswordSuccess: state.Login.isRecoverPasswordSuccess
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeEmail: bindActionCreators(changeEmail, dispatch)
    }
    return { actions }
}

class ForgotPassword extends Component {

    constructor (props) {
        super(props)
        this.state = {
        }
    }

    render() {
       return <LoginContainer/>
    }
}

ForgotPassword.propTypes = {
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword)    