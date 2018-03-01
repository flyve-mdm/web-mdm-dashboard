import React, { Component } from 'react'
import withAdminDashboardLayout from '../../hoc/withAdminDashboardLayout'
import { Route } from 'react-router-dom'

import routes from './routes'
import ContentPane from '../../components/ContentPane'

class AdminDashboard extends Component {
  render() { 
    return (
      <ContentPane itemListPaneWidth={0}>
        {routes.map(({exact, path, component}, i) => (
          <Route 
            exact={exact}
            path={path === '/' ? this.props.match.url : this.props.match.url + path }
            component={component}
            key={i} />
        ))}
      </ContentPane>
    )
  }
}
 

export default withAdminDashboardLayout(AdminDashboard)