import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import Reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const routerReduxMiddleware = routerMiddleware(history)

const getMiddleware = () => {
    return applyMiddleware(routerReduxMiddleware, thunk)
}

export const store = createStore(
    Reducers, 
    composeWithDevTools(getMiddleware())
)