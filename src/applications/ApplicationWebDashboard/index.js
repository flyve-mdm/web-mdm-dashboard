import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router';

import PrivateRoute from '../../components/PrivateRoute';

import SignUp from '../../containers/SignUp'
import SignIn from '../../containers/SignIn'
import ForgotPassword from '../../containers/ForgotPassword'

import ValidateAccount from '../../components/ValidateAccount'

import asyncAdminDashboard from './asyncComponents/asyncAdminDashboard'

/**
 * Main Component in the React Tree
 * This Render each route of the containers or / and components like 404
 */
class ApplicationWebDashboard extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={SignIn} /> 
        <Route path='/signUp' component={SignUp} />
        <Route path='/validateAccount' component={ValidateAccount} />
        <Route path='/forgotPassword' component={ForgotPassword} />
        <PrivateRoute path="/app" component={asyncAdminDashboard} />
        <Redirect to='/' />
      </Switch>    
    )
  }
}

export default ApplicationWebDashboard