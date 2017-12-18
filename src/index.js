import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, history } from './store'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker'
import AdminDashboard from './AdminDashboard'
import { SingUp } from './Login'

/**
 * Assets
 */
import './styles/App.scss'
import './styles/ui-light.css'

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={SingUp} />
                <Route path='/app' component={AdminDashboard} />
            </Switch>
        </ConnectedRouter>
    </Provider>), 
    document.getElementById('app')
)
registerServiceWorker()
