import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, history } from './store'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker'
import Login from './Login'
import AdminDashboard from './AdminDashboard'

/**
 * Assets
 */
import './styles/App.scss'
import './styles/ui-light.css'

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/app' component={AdminDashboard} />
            </Switch>
        </ConnectedRouter>
    </Provider>), 
    document.getElementById('app')
)
registerServiceWorker()
