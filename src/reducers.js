import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AdminDashboard from './AdminDashboard/DuckController'
import Login from './Login/DuckController'

export default combineReducers ({
    AdminDashboard,
    Login,
    router: routerReducer
})
