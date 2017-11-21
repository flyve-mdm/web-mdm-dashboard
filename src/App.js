/**
 * Dependencies
 */
import * as React from 'react'
import AdminDashboard from './AdminDashboard'
import { BrowserRouter as Router, Route } from 'react-router-dom'
/**
 * Assets
 */
import './App.css'
import './ui-light.css'
/**
 * Main component
 * @returns AdminDashboard component
 */
function App() {
  return (
    <Router>
      <Route path="/" component={AdminDashboard} />
    </Router>
  ) 
}

export default App
