import React, { Component } from 'react'
import withAdminDashboardLayout from '../../hoc/withAdminDashboardLayout'

class AdminDashboard extends Component {
  render() { 
    return (
      <React.Fragment>
        <h1>
          Admin Dashboard - Flyve MDM
        </h1>
      </React.Fragment>
    )
  }
}
 
export default withAdminDashboardLayout(AdminDashboard)