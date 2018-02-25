import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApplicationWebDashboard from './applications/ApplicationWebDashboard'
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

// Enable Redux DevTool
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <ApplicationWebDashboard />
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
)

registerServiceWorker()