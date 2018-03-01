import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RootApp from './applications/RootApp'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware, 
    compose
} from 'redux';
import thunk from 'redux-thunk';
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
            <BrowserRouter>
                <RootApp />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)

registerServiceWorker()