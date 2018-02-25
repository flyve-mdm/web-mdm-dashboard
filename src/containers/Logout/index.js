import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authLogout } from '../../store/authentication/actions';

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  }
};

class Logout extends Component {
  componentDidMount () {
    this.props.onLogout();
  }

  render() { 
    return <Redirect to='/'/>
  }
}
 
export default connect(null, mapDispatchToProps)(Logout);