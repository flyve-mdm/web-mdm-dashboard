import React from 'react';
import isAuthenticated from './isAuthenticated'
import { Route, Redirect } from 'react-router'

// TODO: Add HOC connect and:
/*
    const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
    };

    if (this.props.isAuthenticated) ...
*/

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
          <Component {...props} />
      ) : (
          <Redirect to={{
              pathname: '/'
          }} />
      )
  )} />
)

export default PrivateRoute;