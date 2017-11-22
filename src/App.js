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
import './styles/App.scss'
import './styles/ui-light.css'
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
