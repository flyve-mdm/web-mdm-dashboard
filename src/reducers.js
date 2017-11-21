import { combineReducers } from 'redux'
import AdminDashboard from './AdminDashboard/DuckController'
import Login from './Login/DuckController'

export default combineReducers ({
    AdminDashboard,
    Login
})