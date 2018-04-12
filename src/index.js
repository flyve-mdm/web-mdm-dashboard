import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './shared/history'
import RootApp from './applications/RootApp'
import { unregister } from './registerServiceWorker'
import { Provider } from 'react-redux'
import {
    createStore,
    applyMiddleware, 
    compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './store'
import './assets/styles/main.scss' // Global CSS Styles

ReactDOM.render(
    (
        <Provider store={
            createStore(rootReducer, (
                (DevTool) => { // Enable Redux DevTool if are available
                    return (process.env.NODE_ENV === 'development' && typeof(DevTool) === 'function')
                        ? DevTool
                        : compose
                    })(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)(
                applyMiddleware(thunk)
            ))
        }>
            <Router history={history}>
                <RootApp />
            </Router>
        </Provider>
    ),
    document.getElementById('root')
)
unregister()
