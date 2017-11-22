/**
 * Dependencies
 */
import * as React from 'react'
import AdminDashboard from './AdminDashboard'
import Login from './Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

/**
 * Assets
 */
import './App.scss'
import './ui-light.css'
/**
 * Main component
 * @returns AdminDashboard component
 */
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/app' component={AdminDashboard}/>
      </Switch>
    </Router>
  ) 
}

export default App
