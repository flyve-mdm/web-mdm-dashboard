import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authLogout } from '../../store/authentication/actions'

function mapDispatchToProps(dispatch) {
  const actions = {
    logout: bindActionCreators(authLogout, dispatch)
  }
  return { actions }
}


class Logout extends Component {
  componentWillMount () {
    this.props.actions.logout()
  }

  render() { 
    return <Redirect to='/'/>
  }
}
 
export default connect(null, mapDispatchToProps)(Logout)