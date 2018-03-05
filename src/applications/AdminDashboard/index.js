import React, { Component } from 'react'
import withAdminDashboardLayout from '../../hoc/withAdminDashboardLayout'

import routes from './routes'
import GenerateRoutes from '../../components/GenerateRoutes';

class AdminDashboard extends Component {
  render() { 
    return <GenerateRoutes routes={routes} rootPath={this.props.match.url} />
  }
}

export default withAdminDashboardLayout(AdminDashboard)