import React, { Component } from 'react'
import withAdminDashboardLayout from '../../hoc/withAdminDashboardLayout'

import routes from './routes'
import ContentPane from '../../components/ContentPane'
import GenerateRoutes from '../../components/GenerateRoutes';

class AdminDashboard extends Component {
  render() { 
    return (
      <ContentPane itemListPaneWidth={0}>
        <GenerateRoutes routes={routes} rootPath={this.props.match.url} />
      </ContentPane>
    )
  }
}

export default withAdminDashboardLayout(AdminDashboard)