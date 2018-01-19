import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, history } from './store'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker'
import AdminDashboard from './AdminDashboard'
import { SingUp, SignIn, ForgotPassword } from './Login'

/**
 * Assets
 */
import './styles/App.scss'
import './styles/ui-light.css'

const auth = {
    isAuthenticated: () => {
        if (localStorage.getItem('sessionToken') && localStorage.getItem('sessionToken') !== undefined ) {
            return true
        } else {
            return false
        }
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/'
                }} />
            )
    )} />
)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={SingUp} />
                <PrivateRoute path="/app" component={AdminDashboard} />
                <Route path='/signIn' component={SignIn} />
                <Route path='/forgotPassword' component={ForgotPassword} />
            </Switch>
        </ConnectedRouter>
    </Provider>), 
    document.getElementById('app')
)
registerServiceWorker()
